import { View, Text, Pressable } from "react-native";

interface HistoryCardProps {
  type: "simple" | "technical" | "rental";
  clientName: string;
  date: string;
  time?: string;
  onPress: () => void;
}

export function HistoryCard({
  type,
  clientName,
  date,
  time,
  onPress,
}: HistoryCardProps) {
  const typeLabel =
    type === "technical" ? "Técnica" : type === "rental" ? "Locação" : "Simples";

  const typeColor =
    type === "technical"
      ? "bg-blue-100"
      : type === "rental"
      ? "bg-orange-100"
      : "bg-green-100";

  const typeTextColor =
    type === "technical"
      ? "text-blue-700"
      : type === "rental"
      ? "text-orange-700"
      : "text-green-700";

  const lines = clientName.split("\n").filter(Boolean);

  const icon =
  type === "technical" ? "🛠️" : type === "rental" ? "🏠" : "✅";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <View className={`${typeColor} rounded-lg p-4 mb-3 border border-gray-200`}>
        <View className="flex-row justify-between items-center mb-2">
          <Text className={`${typeTextColor} font-semibold text-sm`}>
            {icon} {typeLabel}
          </Text>

          <Text style={{ fontSize: 13, color: "#666", fontWeight: "500" }}>
            {date}
            {time ? ` | ${time}` : ""}
          </Text>
        </View>

        <View style={{ gap: 2 }}>
          {lines.map((line, index) => {
            const isProperty =
              line.toLowerCase().includes("apto") ||
              line.toLowerCase().includes("casa") ||
              line.toLowerCase().includes("sala") ||
              line.toLowerCase().includes("imóvel") ||
              line.toLowerCase().includes("imovel");

            const isCondo =
              line.toLowerCase().includes("cond") ||
              line.toLowerCase().includes("condomínio") ||
              line.toLowerCase().includes("condominio");

            return (
              <Text
                key={`${line}-${index}`}
                style={{
                  fontSize: isProperty ? 16 : 14,
                  fontWeight: isProperty || index === 0 ? "700" : "500",
                  color: isProperty ? "#111" : isCondo ? "#555" : "#222",
                  marginTop: index === 0 ? 0 : 2,
                }}
              >
                {isProperty ? `🏠 ${line}` : line}
              </Text>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
}