import HabitListItem from "@/src/components/HabitListItem";
import { useHabitStore } from "@/src/lib/habitStore";
import { FontAwesome } from "@expo/vector-icons";
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
    <View className="flex-1 px-4  pt-6 bg-background dark:bg-background-dark">

      <FlatList
        data={todayHabits}
        extraData={{ habits, completions }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const done = isHabitDoneToday(item.id);

          return (
            <HabitListItem habit={item} isDone={done} markHabitDone={markHabitDone} />
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
          bg-primary dark:bg-primaryDark w-16 h-16 rounded-full
          items-center justify-center shadow-lg
        ">
          <FontAwesome name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
