
import { Habit, HabitCompletion } from "../types/habit.types";
import { formatDate, getScheduledDaysBetween, isConsecutive, subtractDays } from "../utils/dateUtils";

export const HabitSelectors = {
    getToday(habits: Habit[]): Habit[] {
        const today = new Date().getDay();
        return habits.filter(h => {
            if (h.scheduleType === "daily") return true;
            if (h.scheduleType === "weekly" && h.daysOfWeek) {
                return h.daysOfWeek.split(",").includes(String(today));
            }
            return false;
        });
    },

    getHabitCompletionDates(completions: HabitCompletion[], habitId: number): string[] {
        return completions
            .filter(c => c.habitId === habitId)
            .map(c => c.date)
            .sort();
    },

    calculateCurrentStreak(habit: Habit | null, completions: HabitCompletion[]): number {
        if (!habit) return 0;
        const dates = HabitSelectors.getHabitCompletionDates(completions, habit.id);
        if (dates.length === 0) return 0;

        const today = formatDate(new Date());
        let streak = 0;

        if (dates.includes(today)) {
            streak = 1;
        } else {
            const yesterday = subtractDays(today, 1);
            if (!dates.includes(yesterday)) return 0;
            streak = 1;
        }

        let index = dates.indexOf(streak === 1 && dates.includes(today) ? today : subtractDays(today, 1));
        while (index > 0) {
            if (isConsecutive(dates[index - 1], dates[index])) {
                streak++;
            } else break;
            index--;
        }
        return streak;
    },

    calculateLongestStreak(completions: HabitCompletion[], habitId: number): number {
        const dates = HabitSelectors.getHabitCompletionDates(completions, habitId);
        if (dates.length === 0) return 0;

        let maxStreak = 1, current = 1;
        for (let i = 1; i < dates.length; i++) {
            if (isConsecutive(dates[i - 1], dates[i])) current++;
            else {
                maxStreak = Math.max(maxStreak, current);
                current = 1;
            }
        }
        return Math.max(maxStreak, current);
    },

    calculateSuccessRate(completions: string[], habit: Habit | null, days: number): number {
        if (!habit) return 0;

        // Period: last X days
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - (days - 1));

        // Count completions only inside period
        const actualCompletions = completions.filter(date => {
            return date >= start.toISOString().split("T")[0] &&
                date <= end.toISOString().split("T")[0];
        }).length;

        // Count how many days user should have performed the habit
        const expectedDays = getScheduledDaysBetween(habit, start, end);

        if (expectedDays === 0) return 0;
        return Math.round((actualCompletions / expectedDays) * 100);
    }
};


