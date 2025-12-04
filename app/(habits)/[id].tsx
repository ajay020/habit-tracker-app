import { useLocalSearchParams, useRouter } from "expo-router";
import { BackHandler, Pressable, ScrollView, Text, View } from "react-native";

import { HabitInfoCard } from "@/src/components/HabitInfoCard";
import { HabitStatsCard } from "@/src/components/HabitStatsCard";
import { NotesSection } from "@/src/components/NotesSection";

import { CalendarSection } from "@/src/components/CalendarSection";
import ConfirmDeleteSheet from "@/src/components/ConfirmDeleteSheet";
import WeeklyProgressChart from "@/src/components/WeeklyProgressChart";
import { useHabitStore } from "@/src/lib/habitStore";
import { getDaysLabelsByIds } from "@/src/utils/weekDays";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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
  const [showMenu, setShowMenu] = useState(false);

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

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (showMenu) {
        setShowMenu(false);   // close dropdown
        return true;          // prevent default back navigation
      }
      return false;           // allow normal back behavior
    });

    return () => subscription.remove();
  }, [showMenu]);
  

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const handleUpdateHabit = () => {
    setShowMenu(false);
    router.push(`/(habits)/edit/${id}`);
  }

  const handleDeleteHabit = () => {
    setShowMenu(false);
    setShowDeleteSheet(true);
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      {/* Top App Bar */}
      <TopBar toggleMenu={handleToggleMenu} router={router} />

      {/* BACKDROP (click outside to close) */}
      {showMenu && (
        <Pressable
          onPress={handleToggleMenu}
          className="absolute inset-0 bg-transparent z-40"
        />
      )}

      {/* DROPDOWN MENU */}
      {showMenu && (
        <DropDownMenu
          id={id}
          onEditClick={handleUpdateHabit}
          onDeleteClick={handleDeleteHabit}
        />
      )}

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


const TopBar = (
  { toggleMenu, router }: { toggleMenu: () => void; router: any }
) => {
  return (
    <View className="flex-row items-center justify-between 
    px-4 py-3 bg-primary dark:bg-primary-dark">

      {/* Back Button */}
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="white" />
      </Pressable>

      <Text className="text-lg font-semibold text-white">Habit Details</Text>

      {/* More Button */}
      <Pressable onPress={toggleMenu}>
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const DropDownMenu = (
  { id, onEditClick, onDeleteClick }:
    { id: string; onEditClick: () => void; onDeleteClick: () => void }
) => {
  return (
    <View className="absolute right-4 top-16 
     w-40 bg-card dark:bg-card-dark
     rounded-xl px-4 py-2 z-50">
      <Pressable
        className="py-2"
        onPress={onEditClick}
      >
        <Text className="text-[#FFC107] text-base">Edit Habit</Text>
      </Pressable>

      <Pressable
        className="py-2"
        onPress={onDeleteClick}
      >
        <Text className="text-red-500 text-base">Delete Habit</Text>
      </Pressable>
    </View>
  )
}