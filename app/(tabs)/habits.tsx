import { useHabitStore } from "@/lib/habitStore";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const { habits, loadHabits } = useHabitStore();
    const [refreshing, setRefreshing] = useState(false);

    // Load habits on screen mount
    useEffect(() => {
        loadHabits();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadHabits();
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-4">

            <Text className="text-3xl font-bold text-gray-900 mb-4">Your Habits</Text>

            {/* Empty */}
            {habits.length === 0 && (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-500 text-lg">
                        No habits yet. Create one!
                    </Text>
                </View>
            )}

            {/* Habits List */}
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id.toString()}
                refreshing={refreshing}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <Link href={`/(habits)/${item.id}`} asChild>
                        <TouchableOpacity className="p-4 bg-gray-100 rounded-xl mb-3">
                            <Text className="text-xl font-semibold text-gray-800">
                                {item.title}
                            </Text>
                            <Text className="text-gray-600 mt-1" numberOfLines={2}>
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />

            {/* Floating Add Button */}
            <Link href="/(habits)/create" asChild>
                <TouchableOpacity className="
          absolute bottom-6 right-6
          bg-blue-600 w-16 h-16 rounded-full
          items-center justify-center shadow-lg
        ">
                    <FontAwesome name="plus" size={30} color="#fff" />
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    );
}
