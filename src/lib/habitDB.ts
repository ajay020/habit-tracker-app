import { Habit, HabitCompletion } from "../types/habit.types";
import { db } from "./db";

export const HabitDB = {
    async getAll(): Promise<Habit[]> {
        return await db.getAllAsync<Habit>("SELECT * FROM habits");
    },

    async loadCompletions(): Promise<HabitCompletion[]> {
        return await db.getAllAsync<HabitCompletion>("SELECT * FROM habit_completions");
    },

    async addHabit(habit: Omit<Habit, "id" | "createdAt" | "startDate">): Promise<void> {
        await db.runAsync(
            `INSERT INTO habits (title, description, scheduleType, daysOfWeek, startDate, createdAt)
       VALUES (?, ?, ?, ?, date('now'), datetime('now'))`,
            [habit.title, habit.description, habit.scheduleType, habit.daysOfWeek]
        );
    },

    async updateHabit(id: number, data: Partial<Habit>): Promise<void> {
        const fields = Object.keys(data).map((k) => `${k}=?`).join(", ");
        const values = [...Object.values(data), id];
        await db.runAsync(`UPDATE habits SET ${fields} WHERE id=?`, values);
    },

    async delete(id: number): Promise<void> {
        await db.runAsync("DELETE FROM habits WHERE id=?", [id]);
    },

    async markDone(habitId: number, date: string, done: boolean): Promise<void> {
        if (done) {
            await db.runAsync(
                `DELETE FROM habit_completions WHERE habitId = ? AND date = ?`,
                [habitId, date]
            );
        } else {
            await db.runAsync(
                `INSERT INTO habit_completions (habitId, date, completed) VALUES (?, ?, 1)`,
                [habitId, date]
            );
        }
    },

    getHabitById(id: number): Habit | null {
        return db.getFirstSync<Habit>("SELECT * FROM habits WHERE id = ?", [id]) || null;
    },
};
