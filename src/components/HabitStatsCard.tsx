import { Text, View } from "react-native";

export function HabitStatsCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: string | number;
    icon: string;
}) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                padding: 16,
                borderRadius: 16,
                margin: 4,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <Text style={{ fontSize: 16 }}>{icon} {label}</Text>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>{value}</Text>
        </View>
    );
}
