import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { HabitInfoCard } from "@/src/components/HabitInfoCard";
import { HabitStatsCard } from "@/src/components/HabitStatsCard";
import { NotesSection } from "@/src/components/NotesSection";

import { CalendarSection } from "@/src/components/CalendarSection";
import ConfirmDeleteSheet from "@/src/components/ConfirmDeleteSheet";
import WeeklyProgressChart from "@/src/components/WeeklyProgressChart";
import { useHabitStore } from "@/src/lib/habitStore";
import { getDaysLabelsByIds } from "@/src/utils/weekDays";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const habit = useHabitStore((s) => s.findHabitInStore(Number(id)));
  const completions = useHabitStore((s) => s.completions);

  const currentStreak = useHabitStore(s => s.calculateCurrentStreak(Number(id)));
  const longestStreak = useHabitStore(s => s.calculateLongestStreak(Number(id)));
  const successRate = useHabitStore(s => s.calculateSuccessRate(Number(id), 30));
  const completedHabits = useHabitStore(s => s.getHabitCompletionDates(Number(id)).length);

  const deleteHabit = useHabitStore(s => s.deleteHabit);
  const router = useRouter();

  const getWeeklyProgress = useHabitStore((s) => s.getWeeklyProgress);
  const progress = getWeeklyProgress(Number(id));

  const [showDeleteSheet, setShowDeleteSheet] = useState(false);

  const weekDaysLabel = getDaysLabelsByIds(habit?.daysOfWeek ? habit.daysOfWeek.split(",").map(Number) : []);

  const handleConfirmDelete = () => {
    deleteHabit(Number(id));
    setShowDeleteSheet(false);
    router.back();
  };


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
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        className="flex-1 bg-background dark:bg-background-dark px-4 pt-8">
        <HabitInfoCard
          title={habit.title}
          description={habit.description}
          scheduleText={
            habit.scheduleType === "daily"
              ? "Daily Habit"
              : `Weekly on ${weekDaysLabel}`
          }
        />

        <CalendarSection markedDates={markedDates} />

        {/* Stats */}
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <HabitStatsCard label="Current Streak" value={`${currentStreak} days`} icon="🔥" />
          <HabitStatsCard label="Longest Streak" value={`${longestStreak} days`} icon="🏅" />
        </View>

        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <HabitStatsCard label="Completed" value={completedHabits} icon="✔" />
          <HabitStatsCard label="Success Rate" value={`${successRate}%`} icon="📊" />
        </View>

        <WeeklyProgressChart data={progress} />

        <NotesSection notes={[]} />

        <TouchableOpacity
          onPress={() => router.push(`/(habits)/edit/${id}`)}
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
          onPress={() => setShowDeleteSheet(true)}
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

        {/* Bottom Sheet */}
        <ConfirmDeleteSheet
          visible={showDeleteSheet}
          onCancel={() => setShowDeleteSheet(false)}
          onConfirm={handleConfirmDelete}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
