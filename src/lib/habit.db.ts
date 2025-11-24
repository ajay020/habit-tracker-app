import { db } from "./db";
import { Habit } from "./habitStore";

export const HabitDB = {
    getAll: async () =>
        await db.getAllAsync<Habit>("SELECT * FROM habits"),

    insert: async (habit: Habit) =>
        await db.runAsync(
            `INSERT INTO habits (title, description, scheduleType, daysOfWeek)
       VALUES (?, ?, ?, ?)`,
            [habit.title, habit.description, habit.scheduleType, habit.daysOfWeek]
        ),

    update: async (id: number, fields: Partial<Habit>) => {
        const keys = Object.keys(fields).map((k) => `${k}=?`).join(",");
        const values = [...Object.values(fields), id];
        return db.runAsync(`UPDATE habits SET ${keys} WHERE id=?`, values);
    },

    delete: async (id: number) =>
        await db.runAsync(`DELETE FROM habits WHERE id=?`, [id]),
};
