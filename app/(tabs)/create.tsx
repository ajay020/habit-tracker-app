import Button from "@/src/components/Button";
import WeeklyDaySelector from "@/src/components/WeeklyDaySelector";
import { useHabitStore } from "@/src/lib/habitStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateHabitScreen() {
    const router = useRouter();
    const addHabitToDB = useHabitStore((s) => s.addHabit);
    const { t } = useTranslation();

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
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">

            {/* ---------- TOP BAR ---------- */}
            <View className="flex-row items-center px-4 py-4   bg-background dark:bg-background-dark">


                <Text className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                    Create Habit
                </Text>
            </View>

            {/* ---------- CONTENT ---------- */}
            <ScrollView className="flex-1 px-4 pt-6">

                {/* Input Card */}
                <View className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm mb-6 border border-gray-100 dark:border-slate-700">

                    {/* Title */}
                    <Text className="text-gray-700 dark:text-gray-300 mb-1 font-medium">Title</Text>
                    <TextInput
                        className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded-xl p-3 mb-4"
                        placeholder="Drink Water"
                        placeholderTextColor={"#999"}
                        value={title}
                        onChangeText={setTitle}
                    />

                    {/* Description */}
                    <Text className="text-gray-700 dark:text-gray-300 mb-1 font-medium">Description</Text>
                    <TextInput
                        className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded-xl p-3 mb-4"
                        placeholder="Optional"
                        placeholderTextColor={"#999"}
                        value={description}
                        onChangeText={setDescription}
                    />

                    {/* Schedule type */}
                    <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Schedule Type</Text>

                    <View className="flex-row mb-4">
                        <TouchableOpacity
                            onPress={() => setScheduleType("daily")}
                            className={`px-4 py-2 rounded-full mr-3 ${scheduleType === "daily"
                                ? "bg-blue-600"
                                : "bg-gray-200 dark:bg-slate-700"
                                }`}
                        >
                            <Text
                                className={`${scheduleType === "daily"
                                    ? "text-white"
                                    : "text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                Daily
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setScheduleType("weekly")}
                            className={`px-4 py-2 rounded-full ${scheduleType === "weekly"
                                ? "bg-blue-600"
                                : "bg-gray-200 dark:bg-slate-700"
                                }`}
                        >
                            <Text
                                className={`${scheduleType === "weekly"
                                    ? "text-white"
                                    : "text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                Weekly
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Weekly selector */}
                    {scheduleType === "weekly" && (
                        <WeeklyDaySelector selectedDays={selectedDays} onToggle={toggleDay} />
                    )}
                </View>

                {/* Save Button */}
                <Button label="Add Habit" onPress={handleSave} variant="primary" size="lg" />

                <Text  >{t("save")} </Text>

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
