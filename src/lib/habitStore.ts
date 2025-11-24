import { create } from "zustand";
import { db } from "./db";
import { HabitDB } from "./habit.db";

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
