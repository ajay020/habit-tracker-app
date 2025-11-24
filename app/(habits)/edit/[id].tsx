import { useHabitStore } from "@/src/lib/habitStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditHabit() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const habit = useHabitStore(s =>
        s.habits.find(h => h.id === Number(id))
    );

    const updateHabit = useHabitStore(s => s.updateHabit);
    const deleteHabit = useHabitStore(s => s.deleteHabit);

    const [title, setTitle] = useState(habit?.title ?? "");
    const [description, setDescription] = useState(habit?.description ?? "");

    return (
        <View className="flex-1 p-4 mt-6">
            <Text className="text-xl mb-2">Edit Habit</Text>

            <TextInput
                className="p-3 border rounded-lg mb-4"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                className="p-3 border rounded-lg mb-4"
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity
                className="p-4 bg-blue-600 rounded-lg"
                onPress={() => {
                    updateHabit(Number(id), title, description);
                    router.back();
                }}
            >
                <Text className="text-white text-center font-bold">Update Habit</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="p-4 bg-red-600 rounded-lg mt-4"
                onPress={() => {
                    deleteHabit(Number(id));
                    router.replace("/habits");
                }}
            >
                <Text className="text-white text-center font-bold">Delete Habit</Text>
            </TouchableOpacity>
        </View>
    );
}
