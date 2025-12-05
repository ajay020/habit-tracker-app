import { Category } from "../types/habit.types";
import { db } from "./db";

export const CategoryDB = {
    async getAll(): Promise<Category[]> {
        return await db.getAllAsync<Category>("SELECT * FROM categories ORDER BY title");
    },

    async getById(id: number): Promise<Category | null> {
        return db.getFirstSync<Category>("SELECT * FROM categories WHERE id = ?", [id]) || null;
    },

    async add(category: Omit<Category, "id" | "createdAt">): Promise<number> {
        const result = await db.runAsync(
            `INSERT INTO categories (title, icon, color, createdAt)
             VALUES (?, ?, ?, datetime('now'))`,
            [category.title, category.icon, category.color]
        );
        return result.lastInsertRowId;
    },

    async update(id: number, data: Partial<Omit<Category, "id" | "createdAt">>): Promise<void> {
        const fields = Object.keys(data).map((k) => `${k}=?`).join(", ");
        const values = [...Object.values(data), id];
        await db.runAsync(`UPDATE categories SET ${fields} WHERE id=?`, values);
    },

    async delete(id: number): Promise<void> {
        // This will set categoryId to NULL for habits using this category
        await db.runAsync("DELETE FROM categories WHERE id=?", [id]);
    },

    async exists(title: string): Promise<boolean> {
        const result = await db.getFirstSync<{ count: number }>(
            "SELECT COUNT(*) as count FROM categories WHERE title = ?",
            [title]
        );
        return (result?.count || 0) > 0;
    },
};