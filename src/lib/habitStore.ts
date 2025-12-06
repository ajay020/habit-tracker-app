import { create } from "zustand";
import { Habit, HabitCompletion } from "../types/habit.types";
import { HabitDB } from "./habitDB";
import { HabitSelectors } from "./habits.selector";


type HabitState = {
    habits: Habit[];
    completions: HabitCompletion[];

    loadHabits: () => void;
    loadCompletions: () => void;

    addHabit: (habit: Omit<Habit, "id" | "createdAt" | "startDate">) => void;
    updateHabit: (id: number, data: Partial<Habit>) => void;
    deleteHabit: (id: number) => void;

    // completions
    markHabitDone: (habitId: number) => void;
    isHabitDoneToday: (habitId: number) => boolean;

    // selectors
    getTodayHabits: () => Habit[];
    getHabitCompletionDates: (habitId: number) => string[];
    calculateCurrentStreak: (habitId: number) => number;
    calculateLongestStreak: (habitId: number) => number;

    getHabitById: (id: number) => Habit | null;
    findHabitInStore: (id: number) => Habit | null;

    calculateSuccessRate: (habitId: number, days: number) => number;
    getWeeklyProgress: (habitId: number) => { labels: string[], values: number[] };

    getHabitsByCategory: (categoryId: number) => Habit[];
};

export const useHabitStore = create<HabitState>((set, get) => ({
    habits: [],
    completions: [],

    loadHabits: async () => set({ habits: await HabitDB.getAll() }),
    loadCompletions: async () => set({ completions: await HabitDB.loadCompletions() }),

    addHabit: async (habit) => {
        await HabitDB.addHabit(habit);
        get().loadHabits();
    },

    updateHabit: async (id, data) => {
        await HabitDB.updateHabit(id, data);
        get().loadHabits();
    },

    deleteHabit: async (id) => {
        await HabitDB.delete(id);
        get().loadHabits();
    },

    markHabitDone: async (habitId) => {
        const today = new Date().toISOString().split("T")[0];
        const done = get().isHabitDoneToday(habitId);
        await HabitDB.markDone(habitId, today, done);
        get().loadCompletions();
    },

    isHabitDoneToday: (habitId) => {
        const today = new Date().toISOString().split("T")[0];
        return get().completions.some(c => c.habitId === habitId && c.date === today);
    },

    getTodayHabits: () => HabitSelectors.getToday(get().habits),

    getHabitCompletionDates: (habitId: number) =>
        HabitSelectors.getHabitCompletionDates(get().completions, habitId),

    calculateCurrentStreak: (habitId) =>
        HabitSelectors.calculateCurrentStreak(get().findHabitInStore(habitId), get().completions),

    calculateLongestStreak: (habitId) =>
        HabitSelectors.calculateLongestStreak(get().completions, habitId),

    getHabitById: (id: number) => HabitDB.getHabitById(id),

    findHabitInStore: (id) => get().habits.find(h => h.id === id) || null,

    calculateSuccessRate: (habitId, days = 30) => {
        const habit = get().findHabitInStore(habitId);
        const completions = get().getHabitCompletionDates(habitId);
        return HabitSelectors.calculateSuccessRate(completions, habit, days);
    },

    getWeeklyProgress: (habitId) => {
        const { completions } = get();
        return HabitSelectors.getWeeklyProgress(completions, habitId);
    },

    getHabitsByCategory: (categoryId) =>
        get().habits.filter(h => h.categoryId === categoryId),
}));
