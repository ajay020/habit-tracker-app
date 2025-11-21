import { Text, View } from "react-native";


import { useLocalSearchParams } from "expo-router";

export default function HabitDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold">Habit ID: {id}</Text>
    </View>
  );
}


