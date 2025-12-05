import { create } from "zustand";
import { Category, Habit, HabitCompletion } from "../types/habit.types";
import { CategoryDB } from "./categoryDB";
import { HabitDB } from "./habitDB";
import { HabitSelectors } from "./habits.selector";

type HabitState = {
    habits: Habit[];
    categories: Category[];
    completions: HabitCompletion[];

    loadHabits: () => void;
    loadCategories: () => void;
    loadCompletions: () => void;

    addHabit: (habit: Omit<Habit, "id" | "createdAt" | "startDate">) => void;
    updateHabit: (id: number, data: Partial<Habit>) => void;
    deleteHabit: (id: number) => void;

    addCategory: (category: Omit<Category, "id" | "createdAt">) => Promise<number>;
    updateCategory: (id: number, data: Partial<Omit<Category, "id" | "createdAt">>) => void;
    deleteCategory: (id: number) => void;
    getCategoryById: (id: number) => Category | null;

    markHabitDone: (habitId: number) => void;
    isHabitDoneToday: (habitId: number) => boolean;

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
    categories: [],
    completions: [],

    loadHabits: async () => set({ habits: await HabitDB.getAll() }),
    loadCategories: async () => set({ categories: await CategoryDB.getAll() }),
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

    addCategory: async (category) => {
        const id = await CategoryDB.add(category);
        get().loadCategories();
        return id;
    },

    updateCategory: async (id, data) => {
        await CategoryDB.update(id, data);
        get().loadCategories();
    },

    deleteCategory: async (id) => {
        await CategoryDB.delete(id);
        get().loadCategories();
        get().loadHabits(); // Reload habits as their categoryId may have changed
    },

    getCategoryById: (id) => {
        return get().categories.find(c => c.id === id) || null;
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
    getHabitCompletionDates: (habitId) => HabitSelectors.getHabitCompletionDates(get().completions, habitId),
    calculateCurrentStreak: (habitId) => HabitSelectors.calculateCurrentStreak(get().findHabitInStore(habitId), get().completions),
    calculateLongestStreak: (habitId) => HabitSelectors.calculateLongestStreak(get().completions, habitId),

    getHabitById: (id) => HabitDB.getHabitById(id),
    findHabitInStore: (id) => get().habits.find(h => h.id === id) || null,

    calculateSuccessRate: (habitId: number, days = 30) => {
        const { getHabitCompletionDates, findHabitInStore } = get();
        const habit = findHabitInStore(habitId);
        const completions = getHabitCompletionDates(habitId);
        return HabitSelectors.calculateSuccessRate(completions, habit, days);
    },

    getWeeklyProgress: (habitId: number) => {
        const { completions } = get();
        return HabitSelectors.getWeeklyProgress(completions, habitId);
    },

    getHabitsByCategory: (categoryId: number) => {
        return get().habits.filter(h => h.categoryId === categoryId);
    },
}));