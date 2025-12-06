import CategorySelector from "@/src/components/CategorySelector";
import ColorSelector from "@/src/components/ColorSeletor";
import Button from "@/src/components/common/Button";
import IconSelector from "@/src/components/IconSelector";
import WeeklyDaySelector from "@/src/components/WeeklyDaySelector";
import { useCategoryStore } from "@/src/lib/categorySotre";
import { useHabitStore } from "@/src/lib/habitStore";
import { Habit } from "@/src/types/habit.types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function EditHabitScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const habit = useHabitStore((s) => s.findHabitInStore(Number(id)));
    const updateHabitInDB = useHabitStore((s) => s.updateHabit);

    const categories = useCategoryStore((s) => s.categories);

    if (!habit) return <Text>Habit not found</Text>;

    const [title, setTitle] = useState(habit.title);
    const [description, setDescription] = useState(habit.description);
    const [scheduleType, setScheduleType] = useState<"daily" | "weekly">(
        habit.scheduleType
    );

    const [selectedDays, setSelectedDays] = useState<number[]>(
        habit.daysOfWeek ? habit.daysOfWeek.split(",").map(Number) : []
    );

    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        habit.categoryId ?? null
    );

    const [selectedIcon, setSelectedIcon] = useState(
        habit.icon || "star"
    );

    const [selectedColor, setSelectedColor] = useState(
        habit.color || "#4ade80"
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

        updateHabitInDB(Number(id), {
            id: Number(id),
            title,
            description,
            scheduleType,
            daysOfWeek: scheduleType === "weekly" ? selectedDays.join(",") : null,
            categoryId: selectedCategory,
            icon: selectedIcon,
            color: selectedColor,
        } as Habit);

        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
            {/* Header */}
            <View className="flex flex-row items-center justify-center p-4 mb-4">
                <Text className="text-2xl font-bold text-text dark:text-text-dark">
                    Edit Habit
                </Text>
            </View>

            <ScrollView className="flex-1 px-4 pb-10">

                {/* Title */}
                <Text className="text-text dark:text-text-dark mb-1">Title</Text>
                <TextInput
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-text dark:text-text-dark mb-4"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Habit name..."
                    placeholderTextColor="#999"
                />

                {/* Description */}
                <Text className="text-text dark:text-text-dark mb-1">Description</Text>
                <TextInput
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-3
                    text-text dark:text-text-dark mb-4"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Short description..."
                    placeholderTextColor="#999"
                />

                {/* Category */}
                <CategorySelector
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                {/* Icon Picker */}
                <IconSelector
                    selectedIcon={selectedIcon}
                    onSelect={setSelectedIcon}
                />

                {/* Color Picker */}
                <ColorSelector
                    selectedColor={selectedColor}
                    onSelect={setSelectedColor}
                />

                {/* Schedule Type */}
                <Text className="text-text dark:text-text-dark mb-2">Schedule Type</Text>
                <View className="flex-row mb-4">
                    <Button
                        label="Daily"
                        onPress={() => setScheduleType("daily")}
                        variant={scheduleType === "daily" ? "primary" : "secondary"}
                        className="mr-3"
                    />

                    <Button
                        label="Weekly"
                        onPress={() => setScheduleType("weekly")}
                        variant={scheduleType === "weekly" ? "primary" : "secondary"}
                    />
                </View>

                {/* Weekly Day Picker */}
                {scheduleType === "weekly" && (
                    <WeeklyDaySelector
                        selectedDays={selectedDays}
                        onToggle={toggleDay}
                    />
                )}

                {/* Save / Cancel */}
                <Button
                    onPress={handleSave}
                    variant="primary"
                    label="Save Changes"
                    size="lg"
                    className="my-4"
                />

                <Button
                    onPress={() => router.back()}
                    variant="danger"
                    label="Cancel"
                    size="lg"
                />
            </ScrollView>
        </SafeAreaView>
    );
}
