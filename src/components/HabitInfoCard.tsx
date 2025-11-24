import { Text, View } from "react-native";

export function HabitInfoCard({
    title,
    description,
    scheduleText,
}: {
    title: string;
    description?: string;
    scheduleText: string;
}) {
    return (
        <View
            style={{
                backgroundColor: "#FFF9D6",
                padding: 16,
                borderRadius: 16,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 4 }}>
                {title}
            </Text>

            {description ? (
                <Text style={{ color: "#666", marginBottom: 6 }}>{description}</Text>
            ) : null}

            <Text style={{ color: "#555", fontSize: 14 }}>{scheduleText}</Text>
        </View>
    );
}
