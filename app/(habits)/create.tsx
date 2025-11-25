import WeeklyDaySelector from "@/src/components/WeeklyDaySelector";
import { useHabitStore } from "@/src/lib/habitStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateHabitScreen() {
    const router = useRouter();

    const addHabitToDB = useHabitStore((s) => s.addHabit);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [scheduleType, setScheduleType] = useState<"daily" | "weekly">("daily");
    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    const toggleDay = (dayId: number) => {
        setSelectedDays((prev) =>
            prev.includes(dayId)
                ? prev.filter((d) => d !== dayId)
                : [...prev, dayId]
        );
    };

    const handleSave = () => {
        if (!title.trim()) return;

        const payload = {
            title,
            description,
            scheduleType,
            daysOfWeek: scheduleType === "weekly" ? selectedDays.join(",") : null,
        };
        addHabitToDB(payload);
        router.back();
    };

    return (
        <ScrollView className="flex-1 bg-white px-4 pt-8">
            <Text className="text-2xl font-bold mb-6">Create Habit</Text>

            {/* Title */}
            <Text className="text-gray-600 mb-1">Title</Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Drink Water"
                value={title}
                onChangeText={setTitle}
            />

            {/* Description */}
            <Text className="text-gray-600 mb-1">Description</Text>
            <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Optional"
                value={description}
                onChangeText={setDescription}
            />

            {/* Schedule Type Selector */}
            <Text className="text-gray-600 mb-2">Schedule Type</Text>

            <View className="flex-row mb-4">
                <TouchableOpacity
                    className={`px-4 py-2 rounded-full mr-3 ${scheduleType === "daily" ? "bg-blue-500" : "bg-gray-200"
                        }`}
                    onPress={() => setScheduleType("daily")}
                >
                    <Text
                        className={`${scheduleType === "daily" ? "text-white" : "text-gray-700"
                            }`}
                    >
                        Daily
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`px-4 py-2 rounded-full ${scheduleType === "weekly" ? "bg-blue-500" : "bg-gray-200"
                        }`}
                    onPress={() => setScheduleType("weekly")}
                >
                    <Text
                        className={`${scheduleType === "weekly" ? "text-white" : "text-gray-700"
                            }`}
                    >
                        Weekly
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Weekly Day Picker */}
            {scheduleType === "weekly" && (
                <WeeklyDaySelector
                    selectedDays={selectedDays}
                    onToggle={toggleDay}
                />
            )}

            {/* Save Button */}
            <TouchableOpacity
                onPress={handleSave}
                className="bg-blue-600 py-3 rounded-xl mb-10"
            >
                <Text className="text-center text-white text-lg font-semibold">
                    Save Habit
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
