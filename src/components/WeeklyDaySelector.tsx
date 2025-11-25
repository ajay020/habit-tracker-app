import { Text, TouchableOpacity, View } from "react-native";

const WEEK_DAYS = [
    { id: 0, label: "Sun" },
    { id: 1, label: "Mon" },
    { id: 2, label: "Tue" },
    { id: 3, label: "Wed" },
    { id: 4, label: "Thu" },
    { id: 5, label: "Fri" },
    { id: 6, label: "Sat" },
];

export default function WeeklyDaySelector({
    selectedDays,
    onToggle,
}: {
    selectedDays: number[];
    onToggle: (dayId: number) => void;
}) {
    return (
        <View className="flex-row flex-wrap mb-6">
            {WEEK_DAYS.map((d) => (
                <TouchableOpacity
                    key={d.id}
                    onPress={() => onToggle(d.id)}
                    className={`px-4 py-2 rounded-full m-1 ${selectedDays.includes(d.id) ? "bg-green-500" : "bg-gray-200"
                        }`}
                >
                    <Text
                        className={
                            selectedDays.includes(d.id) ? "text-white" : "text-gray-700"
                        }
                    >
                        {d.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
