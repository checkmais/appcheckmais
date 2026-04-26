import {
  ScrollView,
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { generateInspectionPdf, sharePdf } from "@/lib/pdf-service";
import { ScreenContainer } from "@/components/screen-container";
import { LargeButton } from "@/components/large-button";
import { useInspection } from "@/lib/inspection-context";
import { saveInspection, savePhotos } from "@/lib/storage-service";

export default function SummaryScreen() {
  const router = useRouter();
  const { state, saveRoom } = useInspection();
 const handleGeneratePdf = async () => {
  try {
    const uri = await generateInspectionPdf(state);
    await sharePdf(uri);
  } catch (error) {
    Alert.alert("Erro", "Não foi possível gerar o PDF.");
    console.error("Erro ao gerar PDF:", error);
  }
 };
  const [saving, setSaving] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentPhotos, setCurrentPhotos] = useState<any[]>([]);
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editingRoomName, setEditingRoomName] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    client: true,
    vistoriador: true,
    conditions: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleEditSection = (section: string) => {
  if (section === "client" || section === "vistoriador") {
    router.push({
      pathname: "/inspection/client-data",
      params: { returnTo: "summary" },
    });
   } else if (section === "conditions") {
    router.push({
      pathname: "/inspection/conditions",
      params: { returnTo: "summary" },
    });
   }
   };

  const handleSaveRoomName = (room: any) => {
    if (!editingRoomName.trim()) return;

    saveRoom({
      ...room,
      roomName: editingRoomName,
    });

    setEditingRoomId(null);
    setEditingRoomName("");
  };

  const handleFinalize = async () => {
    setSaving(true);
    try {
      const saved = await saveInspection(state, state.currentInspectionId);
      const photoCount = await savePhotos(saved.folderPath, state.items, state.rooms);

      setSaving(false);
      Alert.alert(
        "✅ Vistoria Salva!",
        `Vistoria salva com sucesso!\n${
          photoCount > 0 ? `${photoCount} foto(s) salva(s) no celular.` : "Nenhuma foto anexada."
        }`,
        [{ text: "OK", onPress: () => router.push("/inspection/export") }]
      );
    } catch (error) {
      setSaving(false);
      Alert.alert("Erro ao salvar", "Não foi possível salvar a vistoria. Tente novamente.");
      console.error("Erro ao finalizar:", error);
    }
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < currentPhotos.length - 1) {
      const nextIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(nextIndex);
      setSelectedPhoto(currentPhotos[nextIndex]);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      const prevIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(prevIndex);
      setSelectedPhoto(currentPhotos[prevIndex]);
    }
  };

  const SectionHeader = ({ title, section }: { title: string; section: string }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
      }}
    >
      <Pressable onPress={() => toggleSection(section)} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#111" }}>{title}</Text>
          <Text style={{ fontSize: 20, color: "#0a7ea4" }}>
            {expandedSections[section] ? "−" : "+"}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => handleEditSection(section)}
        style={{
          marginLeft: 8,
          paddingHorizontal: 12,
          paddingVertical: 4,
          backgroundColor: "#0a7ea4",
          borderRadius: 99,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>Editar</Text>
      </Pressable>
    </View>
  );

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: "#f0f0f0",
      }}
    >
      <Text style={{ fontSize: 13, color: "#888", flex: 1 }}>{label}</Text>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "#111",
          flex: 1,
          textAlign: "right",
        }}
      >
        {value || "—"}
      </Text>
    </View>
  );

  const SectionCard = ({ children }: { children: React.ReactNode }) => (
    <View
      style={{
        backgroundColor: "#f9fafb",
        borderRadius: 12,
        padding: 14,
        borderWidth: 0.5,
        borderColor: "#e5e7eb",
        gap: 2,
      }}
    >
      {children}
    </View>
  );

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 20, paddingBottom: 24 }}>
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "#111" }}>
              Resumo da Vistoria
            </Text>
            <Text style={{ fontSize: 13, color: "#888" }}>
              Etapa 4 de 4 — Revise antes de finalizar
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <SectionHeader title="Cliente (Contratante)" section="client" />
            {expandedSections.client && (
              <SectionCard>
                <InfoRow label="Nome" value={state.client.fullName} />
                <InfoRow label="CPF/CNPJ" value={state.client.document} />
                <InfoRow label="Email" value={state.client.email} />
                <InfoRow label="Telefone" value={state.client.phone} />
                <InfoRow
                  label="Endereço"
                  value={`${state.client.address.street}, ${state.client.address.number}${
                    state.client.address.complement
                      ? ` - ${state.client.address.complement}`
                      : ""
                  }`}
                />
                <InfoRow label="Bairro" value={state.client.address.neighborhood} />
                <InfoRow
                  label="Cidade/UF"
                  value={`${state.client.address.city} - ${state.client.address.state}`}
                />
                <InfoRow label="CEP" value={state.client.address.cep} />
              </SectionCard>
            )}
          </View>

          <View style={{ gap: 8 }}>
            <SectionHeader title="Vistoriador (Contratada)" section="vistoriador" />
            {expandedSections.vistoriador && (
              <SectionCard>
                <InfoRow label="Nome" value={state.vistoriador.name} />
                <InfoRow label="CPF/CNPJ" value={state.vistoriador.document} />
                <InfoRow label="Email" value={state.vistoriador.email} />
                <InfoRow label="Telefone" value={state.vistoriador.phone} />
                <InfoRow
                  label="Endereço"
                  value={`${state.vistoriador.address.street}, ${state.vistoriador.address.number}${
                    state.vistoriador.address.complement
                      ? ` - ${state.vistoriador.address.complement}`
                      : ""
                  }`}
                />
                <InfoRow label="Bairro" value={state.vistoriador.address.neighborhood} />
                <InfoRow
                  label="Cidade/UF"
                  value={`${state.vistoriador.address.city} - ${state.vistoriador.address.state}`}
                />
                {state.type === "technical" && (
                  <>
                    <InfoRow label="CREA" value={state.vistoriador.crea || ""} />
                    <InfoRow label="CAU" value={state.vistoriador.cau || ""} />
                  </>
                )}
              </SectionCard>
            )}
          </View>

          <View style={{ gap: 8 }}>
            <SectionHeader title="Condições da Vistoria" section="conditions" />
            {expandedSections.conditions && (
              <SectionCard>
                <InfoRow label="Data" value={state.conditions.date} />
                <InfoRow label="Hora" value={state.conditions.time} />
                <InfoRow
                  label="Clima"
                  value={
                    {
                      sunny: "Ensolarado",
                      cloudy: "Nublado",
                      rainy: "Chuvoso",
                      partly_cloudy: "Parcialmente nublado",
                    }[state.conditions.weather] || ""
                  }
                />
                <InfoRow
                  label="Acesso"
                  value={
                    {
                      total: "Total",
                      partial: "Parcial",
                      restricted: "Restrito",
                    }[state.conditions.access] || ""
                  }
                />
                <InfoRow
                  label="Iluminação"
                  value={
                    {
                      adequate: "Adequada",
                      partial: "Parcial",
                      insufficient: "Insuficiente",
                    }[state.conditions.lighting] || ""
                  }
                />
                <InfoRow
                  label="Ocupação"
                  value={
                    {
                      empty: "Desocupado",
                      occupied: "Ocupado",
                      under_construction: "Em obra",
                    }[state.conditions.occupancy] || ""
                  }
                />
              </SectionCard>
            )}
          </View>

          <View style={{ gap: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#111" }}>
                Cômodos Vistoriados
              </Text>
              <Pressable
                onPress={() => router.push("/inspection/room-selection")}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  backgroundColor: "#0a7ea4",
                  borderRadius: 99,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
                  + Adicionar
                </Text>
              </Pressable>
            </View>

            <SectionCard>
              {state.rooms.length === 0 ? (
                <Text
                  style={{
                    fontSize: 13,
                    color: "#888",
                    textAlign: "center",
                    paddingVertical: 8,
                  }}
                >
                  Nenhum cômodo vistoriado ainda
                </Text>
              ) : (
                state.rooms.map((room) => {
                  const allTests = room.sections.flatMap((s) => s.tests);
                  const aprovados = allTests.filter((t) => t.status === "approved").length;
                  const reprovados = allTests.filter((t) => t.status === "rejected").length;
                  const fotos = allTests.reduce((acc, t) => acc + t.photos.length, 0);
                  const roomPhotos = allTests.flatMap((t) => t.photos);

                  return (
                    <View
                      key={room.id}
                      style={{
                        paddingVertical: 10,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#f0f0f0",
                      }}
                    >
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Pressable
                            onPress={() =>
                              router.push({
                                pathname: "/inspection/items",
                                params: {
                                  roomId: room.id,
                                  roomName: room.roomName,
                                  areaType: room.areaType,
                                },
                              })
                            }
                            style={{ flex: 1 }}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "600",
                                color: "#111",
                              }}
                            >
                              {room.roomName}{" "}
                              <Text style={{ fontSize: 11, color: "#888" }}>
                                ({room.areaType === "internal" ? "Interna" : "Externa"})
                              </Text>
                            </Text>

                            <Text style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                              ✓ {aprovados} aprovados · ✗ {reprovados} reprovados · 📷 {fotos} fotos
                            </Text>
                          </Pressable>

                          <Pressable
                            onPress={() => {
                              setEditingRoomId(room.id);
                              setEditingRoomName(room.roomName);
                            }}
                            style={{ marginLeft: 8, paddingHorizontal: 8, paddingVertical: 4 }}
                          >
                            <Text style={{ color: "#0a7ea4", fontSize: 11 }}>
                              Editar cômodo
                            </Text>
                          </Pressable>
                        </View>

                        {editingRoomId === room.id && (
                          <View style={{ marginTop: 8 }}>
                            <TextInput
                              value={editingRoomName}
                              onChangeText={setEditingRoomName}
                              style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                padding: 8,
                              }}
                            />

                            <Pressable
                              onPress={() => handleSaveRoomName(room)}
                              style={{ marginTop: 6 }}
                            >
                              <Text style={{ color: "#0a7ea4" }}>Salvar nome</Text>
                            </Pressable>
                          </View>
                        )}
                      </View>

                      {room.observations ? (
                        <Text style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                          Obs.: {room.observations}
                        </Text>
                      ) : null}

                      {roomPhotos.length > 0 && (
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={{ marginTop: 8 }}
                        >
                          <View style={{ flexDirection: "row", gap: 8 }}>
                            {roomPhotos.map((photo) => (
                              <Pressable
                                key={photo.id}
                                onPress={() => {
                                  setCurrentPhotos(roomPhotos);
                                  const index = roomPhotos.findIndex((p) => p.id === photo.id);
                                  setCurrentPhotoIndex(index);
                                  setSelectedPhoto(photo);
                                }}
                              >
                                <View style={{ alignItems: "center" }}>
                                  <Image
                                    source={{ uri: photo.uri }}
                                    style={{ width: 56, height: 56, borderRadius: 8 }}
                                  />
                                </View>
                              </Pressable>
                            ))}
                          </View>
                        </ScrollView>
                      )}

                      <Pressable
                        onPress={() =>
                          router.push({
                            pathname: "/inspection/items",
                            params: {
                              roomId: room.id,
                              roomName: room.roomName,
                              areaType: room.areaType,
                            },
                          })
                        }
                      >
                        <Text style={{ fontSize: 11, color: "#0a7ea4", marginTop: 8 }}>
                          Editar checklist
                        </Text>
                      </Pressable>
                    </View>
                  );
                })
              )}
            </SectionCard>
          </View>

          <View style={{ gap: 12, marginTop: 8 }}>
            {saving ? (
              <View
                style={{
                  backgroundColor: "#0a7ea4",
                  borderRadius: 16,
                  padding: 16,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <ActivityIndicator color="white" size="small" />
                <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>
                  Salvando vistoria...
                </Text>
              </View>
            ) : (
              <LargeButton title="✅ Finalizar e Salvar" onPress={handleFinalize} variant="success" />
            )}
            <LargeButton title="📄 Gerar PDF" onPress={handleGeneratePdf} variant="primary" />
            <Pressable onPress={() => router.back()} style={{ alignItems: "center", padding: 10 }}>
              <Text style={{ color: "#0a7ea4", fontWeight: "600", fontSize: 14 }}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={!!selectedPhoto}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        <Pressable
          onPress={() => setSelectedPhoto(null)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.95)",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Pressable
            onPress={() => setSelectedPhoto(null)}
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              zIndex: 2,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
              ✕ Fechar
            </Text>
          </Pressable>

          {selectedPhoto && (
            <Pressable onPress={() => {}}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable onPress={handlePrevPhoto} style={{ padding: 10 }}>
                  <Text style={{ color: "white", fontSize: 28 }}>
                    {currentPhotoIndex > 0 ? "◀" : " "}
                  </Text>
                </Pressable>

                <Image
                  source={{ uri: selectedPhoto.uri }}
                  style={{ width: 280, height: 450, resizeMode: "contain" }}
                />

                <Pressable onPress={handleNextPhoto} style={{ padding: 10 }}>
                  <Text style={{ color: "white", fontSize: 28 }}>
                    {currentPhotoIndex < currentPhotos.length - 1 ? "▶" : " "}
                  </Text>
                </Pressable>
              </View>

              <Text
                style={{
                  color: "white",
                  marginTop: 12,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {selectedPhoto.caption || "Foto"}
              </Text>

              <Text
                style={{
                  color: "#ccc",
                  marginTop: 4,
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {currentPhotoIndex + 1} / {currentPhotos.length}
              </Text>
            </Pressable>
          )}
        </Pressable>
      </Modal>
    </ScreenContainer>
  );
}