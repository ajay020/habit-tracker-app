import { create } from "zustand";
import { db } from "./db";

export type Habit = {
    id: number;
    title: string;
    description: string;
};

type HabitState = {
    habits: Habit[];
    loadHabits: () => void;
    addHabit: (title: string, description: string) => void;
    updateHabit: (id: number, title: string, description: string) => void;
    deleteHabit: (id: number) => void;

    getHabitById: (id: number) => Habit | null;       // DB lookup
    findHabitInStore: (id: number) => Habit | null;   // State lookup
};

export const useHabitStore = create<HabitState>((set , get) => ({
    habits: [],

    loadHabits: () => {
        const rows = db.getAllSync<Habit>("SELECT * FROM habits");
        set({ habits: rows });
    },

    addHabit: (title, description) => {
        db.runAsync(
            "INSERT INTO habits (title, description) VALUES (?, ?)",
            [title, description]
        );
        set((state) => ({
            habits: [...state.habits, { id: Date.now(), title, description }],
        }));
    },

    updateHabit: (id, title, description) => {
        db.runAsync(
            "UPDATE habits SET title=?, description=? WHERE id=?",
            [title, description, id]
        );
        set((state) => ({
            habits: state.habits.map((h) =>
                h.id === id ? { ...h, title, description } : h
            ),
        }));
    },

    deleteHabit: (id) => {
        db.runAsync("DELETE FROM habits WHERE id=?", [id]);
        set((state) => ({
            habits: state.habits.filter((h) => h.id !== id),
        }));
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
