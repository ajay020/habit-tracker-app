import Button from "@/src/components/Button";
import WeeklyDaySelector from "@/src/components/WeeklyDaySelector";
import { useHabitStore } from "@/src/lib/habitStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { COLORS, HABIT_ICONS } from "@/src/constants/habit";
import { Habit } from "@/src/types/habit.types";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";

export default function CreateHabitScreen() {
    const router = useRouter();
    const addHabitToDB = useHabitStore((s) => s.addHabit);
    const loadCategories = useHabitStore((s) => s.loadCategories);
    const categories = useHabitStore((s) => s.categories);

    // ------------ Form fields ------------ //
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [scheduleType, setScheduleType] = useState<"daily" | "weekly">("daily");
    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedIcon, setSelectedIcon] = useState("check-circle");
    const [selectedColor, setSelectedColor] = useState("#3b82f6");

    const toggleDay = (dayId: number) => {
        setSelectedDays((prev) =>
            prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
        );
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleSave = () => {
        if (!title.trim()) return;

        const payload = {
            title,
            description,
            scheduleType,
            daysOfWeek: scheduleType === "weekly" ? selectedDays.join(",") : null,
            icon: selectedIcon,
            color: selectedColor,
            categoryId: selectedCategory,
        } as Habit;

        addHabitToDB(payload);
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">

            {/* ---------- TOP BAR ---------- */}
            <View className="flex-row items-center px-4 py-4 bg-background dark:bg-background-dark">
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
                            className={`px-4 py-2 rounded-full mr-3 ${scheduleType === "daily" ? "bg-blue-600" : "bg-gray-200 dark:bg-slate-700"
                                }`}
                        >
                            <Text className={scheduleType === "daily" ? "text-white" : "text-gray-700 dark:text-gray-300"}>
                                Daily
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setScheduleType("weekly")}
                            className={`px-4 py-2 rounded-full ${scheduleType === "weekly" ? "bg-blue-600" : "bg-gray-200 dark:bg-slate-700"
                                }`}
                        >
                            <Text className={scheduleType === "weekly" ? "text-white" : "text-gray-700 dark:text-gray-300"}>
                                Weekly
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {scheduleType === "weekly" && (
                        <WeeklyDaySelector selectedDays={selectedDays} onToggle={toggleDay} />
                    )}

                </View>

                {/* ---------- CATEGORY SELECT ---------- */}
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            onPress={() => setSelectedCategory(cat.id)}
                            className={` flex flex-row justify-between mr-3 px-4 py-2 rounded-xl border ${selectedCategory === cat.id
                                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                : "border-gray-300 dark:border-gray-600"
                                }`}
                        >
                            <Feather
                                name={cat.icon as any}
                                size={18}
                                color={selectedIcon === cat.icon ? "#2563eb" : "#6b7280"}
                            />
                            <Text className="pl-2 text-gray-800 dark:text-gray-200">{cat.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* ---------- ICON SELECT ---------- */}
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Icon</Text>
                <View className="flex-row flex-wrap mb-6">
                    {HABIT_ICONS.map((icon) => (
                        <TouchableOpacity
                            key={icon}
                            onPress={() => setSelectedIcon(icon)}
                            className={`w-14 h-14 rounded-xl items-center justify-center mr-3 mb-3 border ${selectedIcon === icon
                                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                : "border-gray-300 dark:border-gray-600"
                                }`}
                        >
                            <Feather
                                name={icon as any}
                                size={24}
                                color={selectedIcon === icon ? "#2563eb" : "#6b7280"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ---------- COLOR SELECT ---------- */}
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Color</Text>
                <View className="flex-row flex-wrap mb-8">
                    {COLORS.map((c) => (
                        <TouchableOpacity
                            key={c}
                            onPress={() => setSelectedColor(c)}
                            className={`w-10 h-10 rounded-full mr-3 mb-3`}
                            style={{
                                backgroundColor: c,
                                borderWidth: selectedColor === c ? 3 : 1,
                                borderColor: selectedColor === c ? "#000" : "#999"
                            }}
                        />
                    ))}
                </View>

                {/* Save Button */}
                <Button label="Add Habit" onPress={handleSave} variant="primary" size="lg" />

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
