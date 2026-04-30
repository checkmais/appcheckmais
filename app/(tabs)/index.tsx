import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { LargeButton } from "@/components/large-button";
import { HistoryCard } from "@/components/history-card";
import { useInspection } from "@/lib/inspection-context";
import { getInspectionsList, loadInspection } from "@/lib/storage-service";

export default function HomeScreen() {
  const router = useRouter();
  const { setInspectionType, loadInspectionState, setCurrentInspectionId } = useInspection();
  const [inspections, setInspections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadInspections();
    }, [])
  );

  const [typeFilter, setTypeFilter] = useState<"all" | "simple" | "technical" | "rental">("all");

  const loadInspections = async () => {
    try {
      setIsLoading(true);
      const list = await getInspectionsList();
      // Ordenar por data mais recente primeiro
      const sorted = list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setInspections(sorted);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [search, setSearch] = useState("");
const [visibleLimit, setVisibleLimit] = useState(10);

  const handleTechnicalInspection = () => {
    setInspectionType("technical");
    router.push("../inspection/client-data");
  };

  const handleSimpleInspection = () => {
    setInspectionType("simple");
    router.push("../inspection/client-data");
  };

  const handleRentalInspection = () => {
    setInspectionType("rental");
    router.push("../inspection/client-data");
  };

  const handleOpenInspection = async (id: string) => {
  try {
    const inspection = await loadInspection(id);

    if (!inspection) {
      console.log("Vistoria não encontrada");
      return;
    }

    loadInspectionState({
      ...inspection,
      currentInspectionId: id,
    });

    setCurrentInspectionId(id);
    router.push("../inspection/summary");
  } catch (error) {
    console.error("Erro ao abrir vistoria:", error);
  }
};

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Check+ Vistorias</Text>
            <Text className="text-base text-muted text-center">
              Selecione o tipo de vistoria para começar
            </Text>
          </View>

          {/* Buttons */}
          <View className="gap-4">
            <LargeButton
              title="Vistoria Simples"
              subtitle="básica"
              onPress={handleSimpleInspection}
              variant="secondary"
              icon={require("@/assets/images/icon.png")}
              iconSize={56}
            />
            <LargeButton
              title="Vistoria Técnica"
              subtitle="com ART"
              onPress={handleTechnicalInspection}
              variant="secondary"
              icon={require("@/assets/images/icon.png")}
              iconSize={56}
            />
            <LargeButton
              title="Vistoria para Locação"
              subtitle="aluguel"
              onPress={handleRentalInspection}
              variant="secondary"
              icon={require("@/assets/images/icon.png")}
              iconSize={56}
            />
          </View>

          {/* Info Section */}
          <View className="bg-surface rounded-2xl p-4 border border-border">
            <Text className="text-sm font-semibold text-foreground mb-2">ℹ️ Informações</Text>
            <Text className="text-xs text-muted leading-relaxed">
              O aplicativo funciona completamente offline. Todos os dados são armazenados localmente no seu dispositivo.
            </Text>
          </View>

          {/* History Section */}
{isLoading ? (
  <View className="items-center justify-center py-8">
    <ActivityIndicator size="large" />
  </View>
) : inspections.length > 0 ? (
  <View className="gap-3">
    <Text className="text-lg font-semibold text-foreground">
      Histórico de Vistorias
    </Text>

    <TextInput
      placeholder="Buscar por nome, imóvel, data ou tipo..."
      value={search}
      onChangeText={(text) => {
        setSearch(text);
        setVisibleLimit(10);
      }}
      style={{
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        backgroundColor: "#fff",
      }}
    />

    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
  {[
    { key: "all", label: "Todos" },
    { key: "simple", label: "Simples" },
    { key: "technical", label: "Técnica" },
    { key: "rental", label: "Locação" },
  ].map((filter) => (
    <Pressable
      key={filter.key}
      onPress={() => {
        setTypeFilter(filter.key as any);
        setVisibleLimit(10);
      }}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: typeFilter === filter.key ? "#0a7ea4" : "#f3f4f6",
      }}
    >
      <Text
        style={{
          color: typeFilter === filter.key ? "white" : "#333",
          fontWeight: "700",
          fontSize: 12,
        }}
      >
        {filter.label}
      </Text>
    </Pressable>
  ))}
</View>

    {inspections
      .filter((item) => {
        if (typeFilter !== "all" && item.type !== typeFilter) return false;
        
        const text = search.toLowerCase();

        const typeLabel =
          item.type === "technical"
            ? "técnica tecnica"
            : item.type === "rental"
            ? "locação locacao aluguel"
            : "simples";

        return (
          item.clientName?.toLowerCase().includes(text) ||
          item.date?.toLowerCase().includes(text) ||
          item.time?.toLowerCase().includes(text) ||
          item.type?.toLowerCase().includes(text) ||
          typeLabel.includes(text)
        );
      })
      .slice(0, visibleLimit)
      .map((inspection) => (
        <HistoryCard
          key={inspection.id}
          type={inspection.type}
          clientName={inspection.clientName}
          date={inspection.date}
          time={inspection.time}
          onPress={() => handleOpenInspection(inspection.id)}
        />
      ))}

    {inspections.filter((item) => {
      const text = search.toLowerCase();

      const typeLabel =
        item.type === "technical"
          ? "técnica tecnica"
          : item.type === "rental"
          ? "locação locacao aluguel"
          : "simples";

      return (
        item.clientName?.toLowerCase().includes(text) ||
        item.date?.toLowerCase().includes(text) ||
        item.time?.toLowerCase().includes(text) ||
        item.type?.toLowerCase().includes(text) ||
        typeLabel.includes(text)
      );
    }).length === 0 && (
      <Text className="text-muted text-center py-4">
        Nenhuma vistoria encontrada
      </Text>
    )}

    {inspections.filter((item) => {
      const text = search.toLowerCase();

      const typeLabel =
        item.type === "technical"
          ? "técnica tecnica"
          : item.type === "rental"
          ? "locação locacao aluguel"
          : "simples";

      return (
        item.clientName?.toLowerCase().includes(text) ||
        item.date?.toLowerCase().includes(text) ||
        item.time?.toLowerCase().includes(text) ||
        item.type?.toLowerCase().includes(text) ||
        typeLabel.includes(text)
      );
    }).length > visibleLimit && (
      <Pressable
        onPress={() => setVisibleLimit((prev) => prev + 10)}
        style={{
          padding: 12,
          borderRadius: 10,
          backgroundColor: "#e0f2fe",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#0a7ea4", fontWeight: "700" }}>
          Carregar mais 10
        </Text>
      </Pressable>
    )}
  </View>
) : (
  <View className="items-center justify-center py-8">
    <Text className="text-muted text-center">
      Nenhuma vistoria realizada ainda
    </Text>
  </View>
)}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
