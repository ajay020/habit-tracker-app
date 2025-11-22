import { useHabitStore } from "@/lib/habitStore";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateHabit() {
    const addHabit = useHabitStore(s => s.addHabit);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <View className="flex-1 p-4 mt-6">
            <Text className="text-xl mb-2">Habit Title</Text>
            <TextInput
                className="p-3 border rounded-lg mb-4"
                value={title}
                onChangeText={setTitle}
            />

            <Text className="text-xl mb-2">Description</Text>
            <TextInput
                className="p-3 border rounded-lg mb-4"
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity
                className="p-4 bg-green-600 rounded-lg"
                onPress={() => {
                    addHabit(title, description);
                    router.back();
                }}
            >
                <Text className="text-white text-center font-bold">Save Habit</Text>
            </TouchableOpacity>
        </View>
    );
}
