import { Habit, HabitCompletion, HabitWithCategory } from "../types/habit.types";
import { db } from "./db";

export const HabitDB = {
    async getAll(): Promise<Habit[]> {
        return await db.getAllAsync<Habit>("SELECT * FROM habits");
    },

    async loadCompletions(): Promise<HabitCompletion[]> {
        return await db.getAllAsync<HabitCompletion>("SELECT * FROM habit_completions");
    },

    async getAllWithCategories(): Promise<HabitWithCategory[]> {
        return await db.getAllAsync<HabitWithCategory>(`
            SELECT 
                h.*,
                json_object(
                    'id', c.id,
                    'title', c.title,
                    'icon', c.icon,
                    'color', c.color,
                    'createdAt', c.createdAt
                ) as category
            FROM habits h
            LEFT JOIN categories c ON h.categoryId = c.id
        `);
    },

    async addHabit(habit: Omit<Habit, "id" | "createdAt" | "startDate">): Promise<void> {
        await db.runAsync(
            `INSERT INTO habits 
            (title, description, scheduleType, daysOfWeek, icon, color, categoryId, startDate, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, date('now'), datetime('now'))`,
            [
                habit.title,
                habit.description ?? null,
                habit.scheduleType,
                habit.daysOfWeek ?? null,
                habit.icon || 'check-circle',
                habit.color || '#3b82f6',
                habit.categoryId || null
            ]
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

    getHabitWithCategory(id: number): HabitWithCategory | null {
        return db.getFirstSync<HabitWithCategory>(`
            SELECT 
                h.*,
                json_object(
                    'id', c.id,
                    'title', c.title,
                    'icon', c.icon,
                    'color', c.color,
                    'createdAt', c.createdAt
                ) as category
            FROM habits h
            LEFT JOIN categories c ON h.categoryId = c.id
            WHERE h.id = ?
        `, [id]) || null;
    },

    async getHabitsByCategory(categoryId: number): Promise<Habit[]> {
        return await db.getAllAsync<Habit>(
            "SELECT * FROM habits WHERE categoryId = ?",
            [categoryId]
        );
    },

    getHabitById(id: number): Habit | null {
        return db.getFirstSync<Habit>("SELECT * FROM habits WHERE id = ?", [id]) || null;
    },
};
