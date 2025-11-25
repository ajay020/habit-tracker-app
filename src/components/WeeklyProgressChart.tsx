import { Text, View } from "react-native";


const dayNames = ["M", "T", "W", "T", "F", "S", "S"];

export default function WeeklyProgressChart({ data }: { data: { labels: string[], values: number[] } }) {
    // data.values = [0,1,1,0,1,0,1]

    return (
        <View className="my-4 p-4 rounded-2xl bg-white shadow">
            <Text className="text-lg font-semibold mb-3">Weekly Progress</Text>

            <View className="flex-row justify-between">
                {data.values.map((v, idx) => (
                    <View key={idx} className="items-center flex-1">
                        <View
                            className={`w-3 h-14 rounded-full ${v === 1 ? "bg-green-500" : "bg-gray-300"
                                }`}
                        />
                        <Text className="mt-1 text-gray-600">{dayNames[idx]}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
