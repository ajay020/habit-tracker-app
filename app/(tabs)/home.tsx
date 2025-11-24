import { useHabitStore } from "@/src/lib/habitStore";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import { useEffect, useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const getTodayHabits = useHabitStore((s) => s.getTodayHabits);
  const loadHabits = useHabitStore((s) => s.loadHabits);
  const loadCompletions = useHabitStore((s) => s.loadCompletions);

  const markHabitDone = useHabitStore((s) => s.markHabitDone);
  const isHabitDoneToday = useHabitStore((s) => s.isHabitDoneToday);

  // SUBSCRIBE so UI re-renders
  const completions = useHabitStore((s) => s.completions);
  const habits = useHabitStore((s) => s.habits);



  // load from database once
  useEffect(() => {
    loadHabits();
    loadCompletions();
  }, []);

  const todayHabits = useMemo(() => getTodayHabits(), [habits]);

  return (
    <View className="flex-1 bg-slate-200 px-4  pt-6">
      <FlatList
        data={todayHabits}
        extraData={{ habits, completions }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const done = isHabitDoneToday(item.id);

          return (
            <View
              className="flex-row items-center justify-between p-4 mb-3 rounded-xl bg-gray-100"
            >
              <TouchableOpacity
                className="flex-1 mr-2"
                onPress={() => {
                  console.log("Item tapped: ", item.id);
                }}
                activeOpacity={0.7}
              >
                <Text className="text-lg font-medium">{item.title}</Text>
                {item.description ? (
                  <Text className="text-gray-500 text-sm">{item.description}</Text>
                ) : null}
              </TouchableOpacity>

              <Checkbox
                className="p-3"
                value={done}
                onValueChange={(v) => {
                  console.log("Checkbox tapped!");
                  markHabitDone(item.id);
                }}
                color={done ? "#4CAF50" : "#aaa"}
              />
            </View>
          );
        }}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-10">
            No habits scheduled for today.
          </Text>
        }
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
    </View>
  );
}
