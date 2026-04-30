import {
  ScrollView,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { LargeButton } from "@/components/large-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useInspection } from "@/lib/inspection-context";
import {
  ChecklistSection,
  TestStatus,
  PhotoWithCaption,
} from "@/lib/checklist-data";

import {
  INTERNAL_CHECKLIST as SIMPLE_INTERNAL,
  EXTERNAL_CHECKLIST as SIMPLE_EXTERNAL,
} from "@/lib/checklist-simple";

import {
  INTERNAL_CHECKLIST as TECH_INTERNAL,
  EXTERNAL_CHECKLIST as TECH_EXTERNAL,
} from "@/lib/checklist-technical";

import {
  INTERNAL_CHECKLIST as RENTAL_INTERNAL,
  EXTERNAL_CHECKLIST as RENTAL_EXTERNAL,
} from "@/lib/checklist-rental";

import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import * as ImageManipulator from "expo-image-manipulator";

export default function ItemsScreen() {
  const router = useRouter();
  const { areaType, roomName, roomId } = useLocalSearchParams<{
    areaType: string;
    roomName: string;
    roomId?: string;
  }>();

  const parsedRoomId = Array.isArray(roomId) ? roomId[0] : roomId;
  const { state, saveRoom } = useInspection();
  const inspectionType = state.type;

  let baseChecklist: ChecklistSection[] = SIMPLE_INTERNAL;

  if (inspectionType === "technical") {
    baseChecklist =
      areaType === "internal" ? (TECH_INTERNAL as any) : (TECH_EXTERNAL as any);
  } else if (inspectionType === "rental") {
    baseChecklist =
      areaType === "internal"
        ? (RENTAL_INTERNAL as any)
        : (RENTAL_EXTERNAL as any);
  } else {
    baseChecklist =
      areaType === "internal"
        ? (SIMPLE_INTERNAL as any)
        : (SIMPLE_EXTERNAL as any);
  }

  const existingRoom = parsedRoomId
    ? state.rooms.find((room) => room.id === parsedRoomId)
    : null;

  const normalizeSections = (checklist: any[] = []) =>
  checklist.map((section: any) => ({
    ...section,
    tests: (section.tests || []).map((test: any) => ({
      ...test,
      photos: test.photos || [],
      severity: test.severity || "",
    })),
  }));

  const [sections, setSections] = useState<any[]>(normalizeSections(baseChecklist));

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [observations, setObservations] = useState("");

  const [entryInspection, setEntryInspection] = useState<any>(null);

  const getRoomId = () => existingRoom?.id || `${areaType}_${roomName}`;

  const saveCurrentRoomProgress = (
    updatedSections = sections,
    updatedObservations = observations
  ) => {
    saveRoom({
      id: getRoomId(),
      roomName: roomName as string,
      areaType: areaType as "internal" | "external",
      sections: updatedSections,
      observations: updatedObservations,
      createdAt: existingRoom?.createdAt || new Date().toISOString(),
    });
  };

  useEffect(() => {
    if (existingRoom) {
      setSections(normalizeSections(existingRoom.sections || []));
      setObservations(existingRoom.observations || "");
      setExpandedSection(existingRoom.sections[0]?.id || null);
    } else {
  if (
    state.type === "rental" &&
    state.rental?.type === "exit" &&
    entryInspection
  ) {
    const entryRoom = entryInspection.rooms?.find(
      (room: any) =>
        room.roomName === roomName &&
        room.areaType === areaType
    );

    if (entryRoom) {
      setSections(normalizeSections(entryRoom.sections || []));
      setExpandedSection(entryRoom.sections?.[0]?.id || null);
      return;
    }
  }

  const freshSections = normalizeSections(baseChecklist);
  setSections(freshSections);
}
    
  }, [existingRoom, areaType, inspectionType]);

  useEffect(() => {
  
  loadEntryInspection();
}, [state.rental?.referenceInspectionId]);

  const markSectionAsNA = (sectionId: string) => {
  const updatedSections = sections.map((section: any) =>
    section.id === sectionId
      ? {
          ...section,
          tests: section.tests.map((test: any) => ({
            ...test,
            status: "na" as TestStatus,
          })),
        }
      : section
  );

  setSections(updatedSections);
  saveCurrentRoomProgress(updatedSections);

  if (Platform.OS !== "web") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
};

const updatePhotoCaption = (
  sectionId: string,
  testId: string,
  photoId: string,
  caption: string
) => {
  const updatedSections = sections.map((section: any) =>
    section.id === sectionId
      ? {
          ...section,
          tests: section.tests.map((test: any) =>
            test.id === testId
              ? {
                  ...test,
                  photos: test.photos.map((p: any) =>
                    p.id === photoId ? { ...p, caption } : p
                  ),
                }
              : test
          ),
        }
      : section
  );

  setSections(updatedSections);
  saveCurrentRoomProgress(updatedSections);
};

const updateTestStatus = (
  sectionId: string,
  testId: string,
  status: TestStatus
) => {
  const updatedSections = sections.map((section: any) =>
    section.id === sectionId
      ? {
          ...section,
          tests: section.tests.map((test: any) =>
            test.id === testId
              ? {
                  ...test,
                  status,
                  severity: status === "rejected" ? test.severity || "" : "",
                }
              : test
          ),
        }
      : section
  );

  setSections(updatedSections);
  saveCurrentRoomProgress(updatedSections);

  if (Platform.OS !== "web") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};

const updateTestSeverity = (
  sectionId: string,
  testId: string,
  severity: string
) => {
  const updatedSections = sections.map((section: any) =>
    section.id === sectionId
      ? {
          ...section,
          tests: section.tests.map((test: any) =>
            test.id === testId ? { ...test, severity } : test
          ),
        }
      : section
  );

  setSections(updatedSections);
  saveCurrentRoomProgress(updatedSections);
};

const updateCustomField = (
  sectionId: string,
  testId: string,
  field: "description" | "customSectionTitle" | "rejectionLegend",
  value: string
) => {
  const updatedSections = sections.map((section: any) =>
    section.id === sectionId
      ? {
          ...section,
          tests: section.tests.map((test: any) =>
            test.id === testId
              ? {
                  ...test,
                  [field]: value,
                }
              : test
          ),
        }
      : section
  );

  setSections(updatedSections);
  
};

const addPhotoToTest = async (
  sectionId: string,
  testId: string,
  uri: string
) => {
  const manipulated = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1280 } }],
    {
      compress: 0.6,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  const newPhoto: PhotoWithCaption = {
    id: Date.now().toString(),
    uri: manipulated.uri,
    caption: "",
    timestamp: new Date().toISOString(),
  };

  const updatedSections = sections.map((section: any) =>
    section.id === sectionId
      ? {
          ...section,
          tests: section.tests.map((test: any) =>
            test.id === testId
              ? { ...test, photos: [...test.photos, newPhoto] }
              : test
          ),
        }
      : section
  );

  setSections(updatedSections);
  saveCurrentRoomProgress(updatedSections);
};

const openCamera = async (sectionId: string, testId: string) => {
  saveCurrentRoomProgress();

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    quality: 0.8,
  });

  if (!result.canceled && result.assets[0]) {
    await addPhotoToTest(sectionId, testId, result.assets[0].uri);
  }
};

const openGallery = async (sectionId: string, testId: string) => {
  saveCurrentRoomProgress();

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 0.8,
  });

  if (!result.canceled && result.assets[0]) {
    await addPhotoToTest(sectionId, testId, result.assets[0].uri);
  }
};

const addPhoto = async (sectionId: string, testId: string) => {
  Alert.alert("Adicionar foto", "Escolha a origem da imagem", [
    {
      text: "Tirar foto",
      onPress: () => openCamera(sectionId, testId),
    },
    {
      text: "Escolher da galeria",
      onPress: () => openGallery(sectionId, testId),
    },
    {
      text: "Cancelar",
      style: "cancel",
    },
  ]);
};

const removePhoto = (
  sectionId: string,
  testId: string,
  photoId: string
) => {
  const updatedSections = sections.map((section: any) =>
    section.id === sectionId
      ? {
          ...section,
          tests: section.tests.map((test: any) =>
            test.id === testId
              ? {
                  ...test,
                  photos: test.photos.filter((p: any) => p.id !== photoId),
                }
              : test
          ),
        }
      : section
  );

  setSections(updatedSections);
  saveCurrentRoomProgress(updatedSections);
};

const removeCustomItem = (sectionId: string, testId: string) => {
  const updated = sections
    .map((section: any) => {
      if (section.id !== sectionId) return section;

      const filteredTests = section.tests.filter(
        (test: any) => test.id !== testId
      );

      return {
        ...section,
        tests: filteredTests,
      };
    })
    .filter((section: any) => {
      if (section.id !== "custom-items") return true;
      return section.tests.length > 0;
    });

  if (expandedSection === sectionId) {
    const stillExists = updated.find((s: any) => s.id === sectionId);
    if (!stillExists) {
      setExpandedSection(null);
    }
  }

  setSections(updated);
  saveCurrentRoomProgress(updated);
};

const addCustomItem = () => {
  const customSectionId = "custom-items";

  const newTest = {
    id: `custom-test-${Date.now()}`,
    description: "",
    customSectionTitle: "",
    rejectionLegend: "",
    status: "pending",
    photos: [],
    isCustom: true,
  };

  const existingCustomSection = sections.find(
    (section: any) => section.id === customSectionId
  );

  let updatedSections;

  if (existingCustomSection) {
    updatedSections = sections.map((section: any) =>
      section.id === customSectionId
        ? {
            ...section,
            tests: [...section.tests, newTest],
          }
        : section
    );
  } else {
    updatedSections = [
      ...sections,
      {
        id: customSectionId,
        title: "Itens Personalizados",
        tests: [newTest],
      },
    ];
  }

  setSections(updatedSections);
  saveCurrentRoomProgress(updatedSections);
};

  const getSectionSummary = (section: any) => {
    const approved = section.tests.filter(
      (t: any) => t.status === "approved"
    ).length;
    const rejected = section.tests.filter(
      (t: any) => t.status === "rejected"
    ).length;
    const na = section.tests.filter((t: any) => t.status === "na").length;
    const pending = section.tests.filter(
      (t: any) => t.status === "pending"
    ).length;
    return { approved, rejected, na, pending, total: section.tests.length };
  };

  const getTotalSummary = () => {
    const allTests = sections.flatMap((s: any) => s.tests);
    return {
      approved: allTests.filter((t: any) => t.status === "approved").length,
      rejected: allTests.filter((t: any) => t.status === "rejected").length,
      na: allTests.filter((t: any) => t.status === "na").length,
      pending: allTests.filter((t: any) => t.status === "pending").length,
      total: allTests.length,
    };
  };

  const handleNext = async () => {
    const rejectedWithoutPhoto = sections
      .flatMap((s: any) => s.tests)
      .find((t: any) => t.status === "rejected" && t.photos.length === 0);

    if (rejectedWithoutPhoto) {
      Alert.alert(
        "Foto obrigatória",
        `O item "${rejectedWithoutPhoto.description}" está reprovado. Adicione pelo menos 1 foto.`
      );
      return;
    }

    if (inspectionType === "technical") {
      const rejectedWithoutSeverity = sections
        .flatMap((s: any) => s.tests)
        .find((t: any) => t.status === "rejected" && !t.severity);

      if (rejectedWithoutSeverity) {
        Alert.alert(
          "Criticidade obrigatória",
          `O item "${rejectedWithoutSeverity.description}" está reprovado. Selecione a criticidade.`
        );
        return;
      }
    }

    if (Platform.OS !== "web") {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    }

    saveCurrentRoomProgress();

    router.push("/inspection/summary");
  };

  const summary = getTotalSummary();

  const statusConfig: Record<TestStatus, { label: string; activeBg: string }> =
    {
      pending: { label: "Pendente", activeBg: "#f5f5f5" },
      approved: { label: "Aprovado", activeBg: "#16a34a" },
      rejected: { label: "Reprovado", activeBg: "#dc2626" },
      na: { label: "N/A", activeBg: "#9ca3af" },
    };

    const loadEntryInspection = async () => {
  if (state.type !== "rental") return;
  if (state.rental?.type !== "exit") return;
  if (!state.rental?.referenceInspectionId) return;

  const id = state.rental.referenceInspectionId;

  const data = await AsyncStorage.getItem(`inspection_${id}`);

  if (data) {
    const parsed = JSON.parse(data);
    setEntryInspection(parsed);
  }
};
const getEntryTest = (sectionId: string, testId: string) => {
  if (!entryInspection) return null;

  const entryRoom = entryInspection.rooms?.find(
    (room: any) =>
      room.roomName === roomName &&
      room.areaType === areaType
  );

  if (!entryRoom) return null;

  const entrySection = entryRoom.sections?.find(
    (section: any) => section.id === sectionId
  );

  if (!entrySection) return null;

  return entrySection.tests?.find((test: any) => test.id === testId) || null;
};
      return (
  <ScreenContainer className="p-0">
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
>
  <View
    style={{
      padding: 16,
      paddingBottom: 8,
      borderBottomWidth: 0.5,
      borderBottomColor: "#e5e7eb",
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: "700", color: "#111" }}>
          {roomName}
        </Text>
        <Text style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
          {areaType === "internal" ? "Área Interna" : "Área Externa"} • Etapa
          3 de 4
        </Text>

        <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
          {[
            {
              label: "Aprovados",
              value: summary.approved,
              color: "#16a34a",
              bg: "#dcfce7",
            },
            {
              label: "Reprovados",
              value: summary.rejected,
              color: "#dc2626",
              bg: "#fee2e2",
            },
            {
              label: "Pendentes",
              value: summary.pending,
              color: "#d97706",
              bg: "#fef3c7",
            },
            {
              label: "N/A",
              value: summary.na,
              color: "#6b7280",
              bg: "#f3f4f6",
            },
          ].map((item) => (
            <View
              key={item.label}
              style={{
                flex: 1,
                backgroundColor: item.bg,
                borderRadius: 8,
                padding: 6,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: item.color,
                }}
              >
                {item.value}
              </Text>
              <Text style={{ fontSize: 9, color: item.color, marginTop: 1 }}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 12, paddingBottom: 260 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {sections.map((section: any) => {
          const sectionSummary = getSectionSummary(section);
          const isExpanded = expandedSection === section.id;

          return (
            <View
              key={section.id}
              style={{
                marginBottom: 10,
                borderWidth: 0.5,
                borderColor: "#e5e7eb",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Pressable
                onPress={() =>
                  setExpandedSection(isExpanded ? null : section.id)
                }
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 12,
                  backgroundColor: "#f9fafb",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 13, fontWeight: "600", color: "#111" }}
                  >
                    {section.title}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
                    {sectionSummary.approved > 0 && (
                      <Text style={{ fontSize: 10, color: "#16a34a" }}>
                        ✓ {sectionSummary.approved}
                      </Text>
                    )}
                    {sectionSummary.rejected > 0 && (
                      <Text style={{ fontSize: 10, color: "#dc2626" }}>
                        ✗ {sectionSummary.rejected}
                      </Text>
                    )}
                    {sectionSummary.pending > 0 && (
                      <Text style={{ fontSize: 10, color: "#d97706" }}>
                        ⏳ {sectionSummary.pending}
                      </Text>
                    )}
                    {sectionSummary.na > 0 && (
                      <Text style={{ fontSize: 10, color: "#9ca3af" }}>
                        N/A {sectionSummary.na}
                      </Text>
                    )}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Pressable
                    onPress={() => markSectionAsNA(section.id)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      backgroundColor:
                        sectionSummary.na === sectionSummary.total
                          ? "#9ca3af"
                          : "#f3f4f6",
                      borderRadius: 99,
                      borderWidth: 0.5,
                      borderColor:
                        sectionSummary.na === sectionSummary.total
                          ? "#9ca3af"
                          : "#e5e7eb",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color:
                          sectionSummary.na === sectionSummary.total
                            ? "white"
                            : "#6b7280",
                      }}
                    >
                      N/A Tudo
                    </Text>
                  </Pressable>

                  <Text style={{ fontSize: 12, color: "#9ca3af" }}>
                    {isExpanded ? "▲" : "▼"}
                  </Text>
                </View>
              </Pressable>

              {isExpanded && (
                <View style={{ padding: 10, gap: 12 }}>
                  {section.tests.map((test: any, index: number) => (
                    <View
                      key={test.id}
                      style={{
                        paddingBottom: 12,
                        borderBottomWidth:
                          index < section.tests.length - 1 ? 0.5 : 0,
                        borderBottomColor: "#f0f0f0",
                      }}
                    >
                      <View style={{ marginBottom: 8 }}>
                        {state.type === "rental" && state.rental?.type === "exit" && (
  (() => {
    const entryTest = getEntryTest(section.id, test.id);

    if (!entryTest) return null;

    const statusLabel =
      entryTest.status === "approved"
        ? "Aprovado"
        : entryTest.status === "rejected"
        ? "Reprovado"
        : entryTest.status === "na"
        ? "N/A"
        : "Pendente";

    return (
      <View
        style={{
          backgroundColor: "#f8fafc",
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "700", color: "#0a7ea4" }}>
          Entrada registrada
        </Text>

        <Text style={{ fontSize: 12, color: "#333", marginTop: 4 }}>
          Status anterior: {statusLabel}
        </Text>

        {entryTest.photos?.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 8 }}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              {entryTest.photos.map((photo: any) => (
                <Image
                  key={photo.id}
                  source={{ uri: photo.uri }}
                  style={{ width: 58, height: 58, borderRadius: 8 }}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    );
  })()
)}
                        {test.isCustom ? (
                          <View style={{ gap: 8 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: "700",
                                  color: "#0a7ea4",
                                }}
                              >
                                Item personalizado
                              </Text>

                              <Pressable
                                onPress={() =>
                                  removeCustomItem(section.id, test.id)
                                }
                                style={{
                                  paddingHorizontal: 10,
                                  paddingVertical: 6,
                                  borderRadius: 8,
                                  backgroundColor: "#fee2e2",
                                  borderWidth: 0.5,
                                  borderColor: "#fecaca",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#dc2626",
                                    fontSize: 11,
                                    fontWeight: "700",
                                  }}
                                >
                                  Excluir
                                </Text>
                              </Pressable>
                            </View>
                            <TextInput
                              placeholder="Nome do item"
                              value={test.customSectionTitle || ""}
                              onChangeText={(text) =>
                                updateCustomField(
                                  section.id,
                                  test.id,
                                  "customSectionTitle",
                                  text
                                )
                                
                            }
                            onBlur={() => saveCurrentRoomProgress()}
                              style={{
                                borderWidth: 0.5,
                                borderColor: "#e5e7eb",
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                fontSize: 12,
                                color: "#333",
                                backgroundColor: "#fff",
                              }}
                              placeholderTextColor="#9ca3af"
                            />

                            <TextInput
                              placeholder="Nome do teste"
                              value={test.description || ""}
                              onChangeText={(text) =>
                                updateCustomField(
                                  section.id,
                                  test.id,
                                  "description",
                                  text
                                )
                              }
                              onBlur={() => saveCurrentRoomProgress()}
                              style={{
                                borderWidth: 0.5,
                                borderColor: "#e5e7eb",
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                fontSize: 12,
                                color: "#333",
                                backgroundColor: "#fff",
                              }}
                              placeholderTextColor="#9ca3af"
                            />

                            {test.status === "rejected" && (
                              <TextInput
                                placeholder="Legenda / motivo da reprovação"
                                value={test.rejectionLegend || ""}
                                onChangeText={(text) =>
                                  updateCustomField(
                                    section.id,
                                    test.id,
                                    "rejectionLegend",
                                    text
                                  )
                                
                                }
                                onBlur={() => saveCurrentRoomProgress()}
                                style={{
                                  borderWidth: 0.5,
                                  borderColor: "#e5e7eb",
                                  borderRadius: 8,
                                  paddingHorizontal: 10,
                                  paddingVertical: 8,
                                  fontSize: 12,
                                  color: "#333",
                                  backgroundColor: "#fff",
                                }}
                                placeholderTextColor="#9ca3af"
                              />
                            )}
                          </View>
                        ) : (
                          <>
                            <Text
                              style={{
                                fontSize: 13,
                                color: "#333",
                                lineHeight: 18,
                                fontWeight: "600",
                              }}
                            >
                              {test.description}
                            </Text>

                            {inspectionType === "technical" &&
                            test.stepByStep?.length > 0 ? (
                              <View style={{ marginTop: 6 }}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: "700",
                                    color: "#444",
                                    marginBottom: 4,
                                  }}
                                >
                                  Passo a passo
                                </Text>

                                {test.stepByStep.map(
                                  (step: string, idx: number) => (
                                    <Text
                                      key={`${test.id}_step_${idx}`}
                                      style={{
                                        fontSize: 11,
                                        color: "#666",
                                        lineHeight: 16,
                                        marginBottom: 2,
                                      }}
                                    >
                                      • {step}
                                    </Text>
                                  )
                                )}
                              </View>
                            ) : test.instruction ? (
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: "#666",
                                  marginTop: 2,
                                  lineHeight: 16,
                                }}
                              >
                                {test.instruction}
                              </Text>
                            ) : null}

                            {inspectionType === "technical" &&
                            test.objectiveCriteria ? (
                              <View style={{ marginTop: 8 }}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: "700",
                                    color: "#444",
                                    marginBottom: 4,
                                  }}
                                >
                                  Critério objetivo
                                </Text>

                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "#666",
                                    lineHeight: 16,
                                    marginBottom: 2,
                                  }}
                                >
                                  <Text style={{ fontWeight: "700" }}>
                                    Aprovado:
                                  </Text>{" "}
                                  {test.objectiveCriteria.approved}
                                </Text>

                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "#666",
                                    lineHeight: 16,
                                    marginBottom: 2,
                                  }}
                                >
                                  <Text style={{ fontWeight: "700" }}>
                                    Reprovado:
                                  </Text>{" "}
                                  {test.objectiveCriteria.rejected}
                                </Text>

                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "#666",
                                    lineHeight: 16,
                                  }}
                                >
                                  <Text style={{ fontWeight: "700" }}>
                                    N/A:
                                  </Text>{" "}
                                  {test.objectiveCriteria.na}
                                </Text>
                              </View>
                            ) : null}
                          </>
                        )}
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 6,
                          marginBottom: 8,
                        }}
                      >
                        {(["approved", "rejected", "na"] as TestStatus[]).map(
                          (status) => (
                            <Pressable
                              key={status}
                              onPress={() =>
                                updateTestStatus(section.id, test.id, status)
                              }
                              style={{
                                flex: 1,
                                paddingVertical: 7,
                                borderRadius: 8,
                                alignItems: "center",
                                backgroundColor:
                                  test.status === status
                                    ? statusConfig[status].activeBg
                                    : "#f5f5f5",
                                borderWidth: 0.5,
                                borderColor:
                                  test.status === status
                                    ? statusConfig[status].activeBg
                                    : "#e5e7eb",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 11,
                                  fontWeight: "600",
                                  color:
                                    test.status === status ? "white" : "#666",
                                }}
                              >
                                {statusConfig[status].label}
                              </Text>
                            </Pressable>
                          )
                        )}
                      </View>

                      {inspectionType === "technical" &&
                        test.status === "rejected" && (
                          <View style={{ marginTop: 8, gap: 8 }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "600",
                                color: "#333",
                              }}
                            >
                              Criticidade da não conformidade
                            </Text>

                            {[
                              {
                                key: "low",
                                label: "Baixa",
                                desc:
                                  test.criticality?.low?.label ||
                                  "Baixa criticidade",
                              },
                              {
                                key: "medium",
                                label: "Média",
                                desc:
                                  test.criticality?.medium?.label ||
                                  "Média criticidade",
                              },
                              {
                                key: "high",
                                label: "Alta",
                                desc:
                                  test.criticality?.high?.label ||
                                  "Alta criticidade",
                              },
                            ].map((level) => (
                              <Pressable
                                key={level.key}
                                onPress={() =>
                                  updateTestSeverity(
                                    section.id,
                                    test.id,
                                    level.key
                                  )
                                }
                                style={{
                                  padding: 10,
                                  borderRadius: 8,
                                  backgroundColor:
                                    test.severity === level.key
                                      ? "#e0f2fe"
                                      : "#f8fafc",
                                  borderWidth: 1,
                                  borderColor:
                                    test.severity === level.key
                                      ? "#0a7ea4"
                                      : "#e5e7eb",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: "700",
                                    color:
                                      test.severity === level.key
                                        ? "#0a7ea4"
                                        : "#333",
                                    marginBottom: 2,
                                  }}
                                >
                                  {level.label}
                                </Text>

                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "#666",
                                    lineHeight: 15,
                                  }}
                                >
                                  {level.desc}
                                </Text>
                              </Pressable>
                            ))}
                          </View>
                        )}

                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 8,
                          marginTop: 8,
                        }}
                      >
                        {test.photos.map((photo: any) => (
                          <View key={photo.id} style={{ position: "relative" }}>
                            <Image
                              source={{ uri: photo.uri }}
                              style={{ width: 64, height: 64, borderRadius: 8 }}
                            />
                            <Pressable
                              onPress={() =>
                                removePhoto(section.id, test.id, photo.id)
                              }
                              style={{
                                position: "absolute",
                                top: -4,
                                right: -4,
                                backgroundColor: "#dc2626",
                                borderRadius: 99,
                                width: 18,
                                height: 18,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 10,
                                  fontWeight: "700",
                                }}
                              >
                                ✕
                              </Text>
                            </Pressable>
                          </View>
                        ))}

                        <Pressable
                          onPress={() => addPhoto(section.id, test.id)}
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 8,
                            borderWidth: 1.5,
                            borderStyle: "dashed",
                            borderColor: "#d1d5db",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 20, color: "#9ca3af" }}>
                            📷
                          </Text>
                        </Pressable>
                      </View>

                      {test.photos.length > 0 && (
                        <View style={{ gap: 6, marginTop: 8 }}>
                          {test.photos.map((photo: any, photoIndex: number) => (
                            <View
                              key={photo.id}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <Image
                                source={{ uri: photo.uri }}
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: 4,
                                }}
                              />
                              <TextInput
                                placeholder={`Legenda da foto ${
                                  photoIndex + 1
                                }...`}
                                value={photo.caption}
                                onChangeText={(text) =>
                                  updatePhotoCaption(
                                    section.id,
                                    test.id,
                                    photo.id,
                                    text
                                  )
                                }
                                style={{
                                  flex: 1,
                                  borderWidth: 0.5,
                                  borderColor: "#e5e7eb",
                                  borderRadius: 8,
                                  paddingHorizontal: 10,
                                  paddingVertical: 6,
                                  fontSize: 12,
                                  color: "#333",
                                }}
                                placeholderTextColor="#9ca3af"
                              />
                            </View>
                          ))}
                        </View>
                      )}

                      {test.status === "rejected" &&
                        test.photos.length === 0 && (
                          <Text
                            style={{
                              fontSize: 11,
                              color: "#dc2626",
                              marginTop: 4,
                            }}
                          >
                            ⚠ Foto obrigatória para itens reprovados
                          </Text>
                        )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {(inspectionType === "simple" ||
  inspectionType === "technical" ||
  inspectionType === "rental") && (
  <Pressable
    onPress={addCustomItem}
            style={{
              marginTop: 4,
              marginBottom: 10,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#0a7ea4",
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f8fbff",
            }}
          >
            <Text
              style={{
                color: "#0a7ea4",
                fontWeight: "700",
                fontSize: 14,
              }}
            >
              + Item personalizado
            </Text>
          </Pressable>
        )}

        <View style={{ marginTop: 4, marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: "#333",
              marginBottom: 6,
            }}
          >
            Observações gerais
          </Text>
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Alguma observação sobre este cômodo..."
            value={observations}
            onChangeText={(text) => {
              setObservations(text);
              saveCurrentRoomProgress(sections, text);
            }}
            style={{
              borderWidth: 0.5,
              borderColor: "#e5e7eb",
              borderRadius: 10,
              padding: 12,
              fontSize: 13,
              color: "#333",
              minHeight: 80,
              textAlignVertical: "top",
            }}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={{ gap: 10, marginTop: 8 }}>
          <LargeButton
            title="Salvar e continuar →"
            onPress={handleNext}
            variant="primary"
          />
          <Pressable
            onPress={() => {
              saveCurrentRoomProgress();
              router.back();
            }}
            style={{ alignItems: "center", padding: 10 }}
          >
            <Text
              style={{ color: "#0a7ea4", fontWeight: "600", fontSize: 14 }}
            >
              Voltar
            </Text>
          </Pressable>
        </View>
            </ScrollView>
    </KeyboardAvoidingView>
  </ScreenContainer>
);
}