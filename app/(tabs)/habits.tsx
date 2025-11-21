import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Habits() {
    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold">Your Habits</Text>

            <TouchableOpacity
                className="mt-6 bg-blue-500 p-4 rounded-xl"
                onPress={() => router.push("/(habits)/create")}
            >
                <Text className="text-white text-center">+ Create Habit</Text>
            </TouchableOpacity>
        </View>
    );
}
