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
                padding: 16,
                borderRadius: 16,
                margin: 4,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
            }}
            className="bg-card dark:bg-card-dark"
        >
            <Text style={{ fontSize: 16 }} className="text-text dark:text-text-dark">
                {icon} {label}
            </Text>
            <Text
                style={{ fontSize: 22, fontWeight: "700" }}
                className="text-text dark:text-text-dark">
                {value}
            </Text>
        </View>
    );
}
