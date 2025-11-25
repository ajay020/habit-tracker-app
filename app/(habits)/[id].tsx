import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { HabitInfoCard } from "@/src/components/HabitInfoCard";
import { HabitStatsCard } from "@/src/components/HabitStatsCard";
import { NotesSection } from "@/src/components/NotesSection";
import { WeeklyProgressChart } from "@/src/components/WeeklyProgressChart";

import { CalendarSection } from "@/src/components/CalendarSection";
import { useHabitStore } from "@/src/lib/habitStore";

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const habit = useHabitStore((s) => s.findHabitInStore(Number(id)));
  const completions = useHabitStore((s) => s.completions);

  const currentStreak = useHabitStore(s => s.calculateCurrentStreak(Number(id)));
  const longestStreak = useHabitStore(s => s.calculateLongestStreak(Number(id)));
  const successRate = useHabitStore(s => s.calculateSuccessRate(Number(id), 30));



  if (!habit) return <Text>Habit not found.</Text>;

  // Convert completions to markedDates
  const markedDates: any = {};
  completions
    .filter((c) => c.habitId === Number(id))
    .forEach((c) => {
      markedDates[c.date] = {
        startingDay: true,
        endingDay: true,
        color: "#FFC107",
        textColor: "black",
      };
    });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f8f8f8", padding: 16 }}
    >
      <HabitInfoCard
        title={habit.title}
        description={habit.description}
        scheduleText={
          habit.scheduleType === "daily"
            ? "Daily Habit"
            : `Weekly on ${habit.daysOfWeek}`
        }
      />

      <CalendarSection markedDates={markedDates} />

      {/* Stats */}
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <HabitStatsCard label="Current Streak" value={`${currentStreak} days`} icon="🔥" />
        <HabitStatsCard label="Longest Streak" value={`${longestStreak} days`} icon="🏅" />
      </View>

      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <HabitStatsCard label="Completed" value="68" icon="✔" />
        <HabitStatsCard label="Success Rate" value={`${successRate}%`} icon="📊" />
      </View>

      <WeeklyProgressChart />

      <NotesSection notes={[]} />

      <TouchableOpacity
        style={{
          backgroundColor: "#FFC107",
          padding: 14,
          borderRadius: 24,
          marginBottom: 12,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Edit Habit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "red",
          padding: 14,
          borderRadius: 24,
          marginBottom: 40,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "600", color: "red" }}>
          Delete Habit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
