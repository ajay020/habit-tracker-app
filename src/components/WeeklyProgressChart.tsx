import { Text, View } from "react-native";

export function WeeklyProgressChart() {
    return (
        <View
            style={{
                backgroundColor: "white",
                padding: 16,
                borderRadius: 16,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                Weekly Progress
            </Text>

            <View style={{ height: 80, flexDirection: "row", alignItems: "flex-end", gap: 12 }}>
                {[50, 80, 30, 70, 60, 20, 40].map((h, i) => (
                    <View
                        key={i}
                        style={{
                            width: 20,
                            height: h,
                            backgroundColor: "#FFE082",
                            borderRadius: 8,
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
