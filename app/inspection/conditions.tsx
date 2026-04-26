import { ScrollView, View, Text, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FormInput } from "@/components/form-input";
import { LargeButton } from "@/components/large-button";
import { Toast } from "@/components/toast";
import { useInspection } from "@/lib/inspection-context";
import * as Haptics from "expo-haptics";
import { useState, useEffect } from "react";

export default function ConditionsScreen() {
  function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}
  const { state, updateConditions } = useInspection();
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  useEffect(() => {
  updateConditions({
    date: state.conditions.date || getCurrentDate(),
    time: state.conditions.time || getCurrentTime(),
  });
}, []);
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();

  const handleNext = async () => {
    if (Platform.OS !== "web") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    setShowToast(true);

    setTimeout(() => {
      if (returnTo === "summary") {
        router.push("/inspection/summary");
      } else {
        router.push("/inspection/room-selection");
      }
    }, 500);
  };
   function formatDate(text: string) {
  const cleaned = text.replace(/\D/g, "");

  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 4)
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
}
function getCurrentTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
  return (
    <ScreenContainer className="p-6">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="gap-6 pb-6">
              <View className="gap-2">
                <Text className="text-2xl font-bold text-foreground">Condições da Vistoria</Text>
                <Text className="text-sm text-muted">Etapa 2 de 4</Text>
              </View>

              <View className="gap-4">
                <Text className="text-lg font-semibold text-foreground">Data e Hora</Text>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <FormInput
                      label="Data"
                      placeholder="DD/MM/AAAA"
                      value={state.conditions.date}
                      onChangeText={(text) =>
  updateConditions({ date: formatDate(text) })
}
                    />
                  </View>
                  <View className="flex-1">
                    <FormInput
                      label="Hora"
                      placeholder="HH:MM"
                      value={state.conditions.time}
                      onChangeText={(text) => updateConditions({ time: text })}
                    />
                  </View>
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Clima</Text>
                <View className="flex-row gap-2 flex-wrap">
                  {["sunny", "cloudy", "rainy", "partly_cloudy"].map((weather) => (
                    <Pressable
                      key={weather}
                      onPress={() => updateConditions({ weather: weather as any })}
                      className={`px-4 py-2 rounded-full border ${
                        state.conditions.weather === weather
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                    >
                      <Text
                        className={
                          state.conditions.weather === weather
                            ? "text-background font-semibold"
                            : "text-foreground"
                        }
                      >
                        {weather === "sunny"
                          ? "Ensolarado"
                          : weather === "cloudy"
                          ? "Nublado"
                          : weather === "rainy"
                          ? "Chuvoso"
                          : "Parcialmente Nublado"}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Acesso</Text>
                <View className="flex-row gap-2 flex-wrap">
                  {["total", "partial", "restricted"].map((access) => (
                    <Pressable
                      key={access}
                      onPress={() => updateConditions({ access: access as any })}
                      className={`px-4 py-2 rounded-full border ${
                        state.conditions.access === access
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                    >
                      <Text
                        className={
                          state.conditions.access === access
                            ? "text-background font-semibold"
                            : "text-foreground"
                        }
                      >
                        {access === "total"
                          ? "Total"
                          : access === "partial"
                          ? "Parcial"
                          : "Restrito"}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Iluminação</Text>
                <View className="flex-row gap-2 flex-wrap">
                  {["adequate", "partial", "insufficient"].map((lighting) => (
                    <Pressable
                      key={lighting}
                      onPress={() => updateConditions({ lighting: lighting as any })}
                      className={`px-4 py-2 rounded-full border ${
                        state.conditions.lighting === lighting
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                    >
                      <Text
                        className={
                          state.conditions.lighting === lighting
                            ? "text-background font-semibold"
                            : "text-foreground"
                        }
                      >
                        {lighting === "adequate"
                          ? "Adequada"
                          : lighting === "partial"
                          ? "Parcial"
                          : "Insuficiente"}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Ocupação</Text>
                <View className="flex-row gap-2 flex-wrap">
                  {["empty", "occupied", "under_construction"].map((occupancy) => (
                    <Pressable
                      key={occupancy}
                      onPress={() => updateConditions({ occupancy: occupancy as any })}
                      className={`px-4 py-2 rounded-full border ${
                        state.conditions.occupancy === occupancy
                          ? "bg-primary border-primary"
                          : "bg-surface border-border"
                      }`}
                    >
                      <Text
                        className={
                          state.conditions.occupancy === occupancy
                            ? "text-background font-semibold"
                            : "text-foreground"
                        }
                      >
                        {occupancy === "empty"
                          ? "Vazio"
                          : occupancy === "occupied"
                          ? "Ocupado"
                          : "Em Reforma"}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-lg font-semibold text-foreground">Responsabilidade Técnica</Text>
                <View className="flex-row gap-2">
                  <Pressable
                    onPress={() =>
                      updateConditions({
                        artMode: "without_art",
                        artNumber: "",
                        artDate: "",
                        artType: "",
                        artNotes: "",
                      })
                    }
                    className={`flex-1 px-4 py-3 rounded-xl border ${
                      state.conditions.artMode === "without_art" || !state.conditions.artMode
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        state.conditions.artMode === "without_art" || !state.conditions.artMode
                          ? "text-background"
                          : "text-foreground"
                      }`}
                    >
                      Sem ART
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      updateConditions({
                        artMode: "with_art",
                      })
                    }
                    className={`flex-1 px-4 py-3 rounded-xl border ${
                      state.conditions.artMode === "with_art"
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        state.conditions.artMode === "with_art"
                          ? "text-background"
                          : "text-foreground"
                      }`}
                    >
                      Com ART
                    </Text>
                  </Pressable>
                </View>
              </View>

              {state.conditions.artMode === "with_art" && (
                <View className="gap-4">
                  <Text className="text-lg font-semibold text-foreground">Dados da ART</Text>

                  <FormInput
                    label="Número da ART"
                    placeholder="Digite o número da ART"
                    value={state.conditions.artNumber || ""}
                    onChangeText={(text) => updateConditions({ artNumber: text })}
                  />

                  <FormInput
                    label="Data da ART"
                    placeholder="DD/MM/AAAA"
                    value={state.conditions.artDate || ""}
                    onChangeText={(text) =>
  updateConditions({ artDate: formatDate(text) })
}
                  />

                  <FormInput
                    label="Tipo / Finalidade da ART"
                    placeholder="Ex.: Vistoria, Laudo, Inspeção Predial"
                    value={state.conditions.artType || ""}
                    onChangeText={(text) => updateConditions({ artType: text })}
                  />

                  <FormInput
                    label="Observações da ART"
                    placeholder="Informações complementares"
                    value={state.conditions.artNotes || ""}
                    onChangeText={(text) => updateConditions({ artNotes: text })}
                    multiline
                    numberOfLines={4}
                  />
                </View>
              )}

              <View className="gap-3 mt-4">
                <LargeButton title="Próximo" onPress={handleNext} variant="primary" />
                <Pressable onPress={() => router.back()}>
                  <Text className="text-center text-primary font-semibold">Voltar</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Toast
        message="Condições salvas com sucesso!"
        type="success"
        visible={showToast}
        onHide={() => setShowToast(false)}
      />
    </ScreenContainer>
  );
}