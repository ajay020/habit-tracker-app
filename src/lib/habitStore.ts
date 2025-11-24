import { create } from "zustand";
import { formatDate, isConsecutive, subtractDays } from "../utils/dateUtils";
import { db } from "./db";
import { HabitDB } from "./habitDB";

export type Habit = {
    id: number;
    title: string;
    description: string;
    scheduleType: "daily" | "weekly" | "custom";
    daysOfWeek: string | null;
    startDate: string;
    createdAt: string;
};

export type HabitCompletion = {
    id: number;
    habitId: number;
    date: string; // "YYYY-MM-DD"
};


type HabitState = {
    habits: Habit[];
    completions: HabitCompletion[];

    loadHabits: () => void;
    loadCompletions: () => void;

    addHabit: (habit: Omit<Habit, "id" | "createdAt" | "startDate">) => void;
    updateHabit: (id: number, data: Partial<Habit>) => void;
    deleteHabit: (id: number) => void;

    markHabitDone: (habitId: number) => void;
    isHabitDoneToday: (habitId: number) => boolean;

    getTodayHabits: () => Habit[];

    calculateCurrentStreak: (habitId: number) => number;
    calculateLongestStreak: (habitId: number) => number;
    getHabitCompletionDates: (habitId: number) => string[];


    getHabitById: (id: number) => Habit | null;       // DB lookup
    findHabitInStore: (id: number) => Habit | null;   // State lookup
};

export const useHabitStore = create<HabitState>((set, get) => ({
    habits: [],
    completions: [],

    // Load habits
    loadHabits: async () => {
        set({ habits: await HabitDB.getAll() });
    },


    // Load completions
    loadCompletions: async () => {
        const rows = await db.getAllAsync<HabitCompletion>(
            "SELECT * FROM habit_completions"
        );
        set({ completions: rows });
    },

    // Add habit
    addHabit: async ({ title, description, scheduleType, daysOfWeek }) => {
        await db.runAsync(
            `
            INSERT INTO habits (title, description, scheduleType, daysOfWeek)
            VALUES (?, ?, ?, ?)
            `,
            [title, description, scheduleType, daysOfWeek ?? null]
        );

        // reload fresh data
        get().loadHabits();
    },


    // Update habit
    updateHabit: async (id, data) => {
        const fields = Object.keys(data).map((k) => `${k}=?`).join(", ");
        const values = [...Object.values(data), id];

        await db.runAsync(`UPDATE habits SET ${fields} WHERE id=?`, values);

        await get().loadHabits();
    },

    // Delete habit
    deleteHabit: async (id) => {
        await HabitDB.delete(id);
        await get().loadHabits();
    },

    // Mark habit as done for today
    markHabitDone: async (habitId) => {
        const today = new Date().toISOString().split("T")[0];

        const done = get().isHabitDoneToday(habitId);

        if (done) {
            await db.runAsync(
                `DELETE FROM habit_completions WHERE habitId = ? AND date = ?`,
                habitId,
                today
            );

            set((state) => ({
                completions: state.completions.filter(c => !(c.habitId === habitId && c.date === today))
            }));

        } else {
            await db.runAsync(
                `INSERT INTO habit_completions (habitId, date, completed) VALUES (?, ?, 1)`,
                habitId,
                today
            );
        }

        // Reload completions
        await get().loadCompletions();
    },

    // Check if done today
    isHabitDoneToday: (habitId) => {
        const today = new Date().toISOString().split("T")[0];
        return get().completions.some(
            (c) => c.habitId === habitId && c.date === today
        );
    },

    getTodayHabits: () => {
        const { habits } = get();
        const today = new Date();
        const weekday = today.getDay().toString(); // "0"-"6"

        return habits.filter((h) => {
            if (h.scheduleType === "daily") return true;

            if (h.scheduleType === "weekly" && h.daysOfWeek) {
                const arr = h.daysOfWeek.split(","); // ex: "1,3,5"
                return arr.includes(weekday);
            }

            return false;
        });
    },

    getHabitCompletionDates: (habitId: number) => {
        const completions = get().completions
            .filter(c => c.habitId === habitId)
            .map(c => c.date)
            .sort(); // ascending YYYY-MM-DD

        return completions;
    },

    calculateCurrentStreak: (habitId: number) => {
        const { getHabitCompletionDates, findHabitInStore } = get();
        const habit = findHabitInStore(habitId);
        if (!habit) return 0;

        const dates = getHabitCompletionDates(habitId);
        if (dates.length === 0) return 0;

        const today = formatDate(new Date());
        let streak = 0;

        // CASE 1: Today is completed → streak starts today
        if (dates.includes(today)) {
            streak = 1;
        } else {
            // Today is not completed → check if yesterday was completed
            const yesterday = subtractDays(today, 1);
            if (!dates.includes(yesterday)) {
                return 0; // streak broken
            }
            streak = 1;
        }

        // Continue backwards
        let index = dates.indexOf(streak === 1 && dates.includes(today) ? today : subtractDays(today, 1));

        while (index > 0) {
            const prev = dates[index - 1];
            const curr = dates[index];

            if (isConsecutive(prev, curr)) {
                streak++;
            } else {
                break;
            }
            index--;
        }

        return streak;
    },

    calculateLongestStreak: (habitId: number) => {
        const { getHabitCompletionDates } = get();

        const dates = getHabitCompletionDates(habitId);
        if (dates.length === 0) return 0;

        let maxStreak = 1;
        let current = 1;

        for (let i = 1; i < dates.length; i++) {
            if (isConsecutive(dates[i - 1], dates[i])) {
                current++;
            } else {
                maxStreak = Math.max(maxStreak, current);
                current = 1;
            }
        }

        maxStreak = Math.max(maxStreak, current);
        return maxStreak;
    },





    // Fetch fresh habit from SQLite
    getHabitById: (id) => {
        const row = db.getFirstSync<Habit>(
            "SELECT * FROM habits WHERE id = ?",
            [id]
        );
        return row || null;
    },

    // Lookup habit in current Zustand state
    findHabitInStore: (id: number) => {
        const state = get();
        return state.habits.find(h => h.id === id) || null;
    },
}));
