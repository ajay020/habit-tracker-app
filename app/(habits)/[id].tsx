import { Habit, useHabitStore } from "@/lib/habitStore";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HabitDetails() {
  const { id } = useLocalSearchParams();
  const habitId = Number(id);

  const router = useRouter();

  const { findHabitInStore, getHabitById, deleteHabit } = useHabitStore();

  const [habit, setHabit] = useState<Habit | null>(null);

  // Load habit from store or DB
  useEffect(() => {
    let h = findHabitInStore(habitId);

    if (!h) {
      console.log("Fetching from DB...");
      h = getHabitById(habitId);
    }

    setHabit(h);
  }, [habitId]);

  if (!habit) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-medium">Habit not found...</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    deleteHabit(habitId);
    router.back(); // return to previous screen
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push(`/(habits)/edit/${habitId}`)}>
          <FontAwesome name="pencil" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View>
        <Text className="text-3xl font-bold text-gray-900">{habit.title}</Text>

        <Text className="text-gray-600 mt-3 text-base leading-6">
          {habit.description}
        </Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={handleDelete}
        className="bg-red-500 p-4 rounded-xl mt-10"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Delete Habit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
