import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HabitsHome2() {
    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-xl font-bold">Your Habits</Text>

            <Link href="/(tabs)/habits/create" className="mt-4">
                <Text className="text-blue-600">+ Create New Habit</Text>
            </Link>
        </View>
    );
}
