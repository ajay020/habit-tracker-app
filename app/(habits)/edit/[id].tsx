import Button from "@/src/components/Button";
import WeeklyDaySelector from "@/src/components/WeeklyDaySelector";
import { useHabitStore } from "@/src/lib/habitStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function EditHabitScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const habit = useHabitStore((s) => s.findHabitInStore(Number(id)));
    const updateHabitInDB = useHabitStore((s) => s.updateHabit);

    // ----- PREFILL FORM -----
    const [title, setTitle] = useState(habit?.title || "");
    const [description, setDescription] = useState(habit?.description || "");
    const [scheduleType, setScheduleType] = useState<"daily" | "weekly">(
        habit?.scheduleType || "daily"
    );

    const [selectedDays, setSelectedDays] = useState<number[]>(
        habit?.daysOfWeek ? habit.daysOfWeek.split(",").map(Number) : []
    );

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
            id: Number(id),
            title,
            description,
            scheduleType,
            daysOfWeek: scheduleType === "weekly" ? selectedDays.join(",") : null,
        };

        updateHabitInDB(Number(id), payload);

        router.back();
    };

    if (!habit) return <Text>Habit not found</Text>;

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
            <ScrollView className="flex-1  px-4 pb-4 mb-4">
                <Text className="text-2xl font-bold mb-6">Edit Habit</Text>

                {/* Title */}
                <Text className="text-gray-600 mb-1">Title</Text>
                <TextInput
                    className="border border-gray-300 text-text rounded-lg p-3 mb-4"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Description */}
                <Text className="text-gray-600 mb-1">Description</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                    value={description}
                    onChangeText={setDescription}
                />

                {/* Schedule Selector */}
                <Text className="text-gray-600 mb-2">Schedule Type</Text>
                <View className="flex-row mb-4">
                    <TouchableOpacity
                        className={`px-4 py-2 rounded-full mr-3 ${scheduleType === "daily" ? "bg-blue-500" : "bg-gray-200"
                            }`}
                        onPress={() => setScheduleType("daily")}
                    >
                        <Text className={scheduleType === "daily" ? "text-white" : "text-gray-700"}>
                            Daily
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`px-4 py-2 rounded-full ${scheduleType === "weekly" ? "bg-blue-500" : "bg-gray-200"
                            }`}
                        onPress={() => setScheduleType("weekly")}
                    >
                        <Text className={scheduleType === "weekly" ? "text-white" : "text-gray-700"}>
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

                {/* Save */}

                <Button onPress={handleSave} variant="primary" label="Save changes" size="lg" className="my-4" />
            </ScrollView>
        </SafeAreaView>
    );
}
