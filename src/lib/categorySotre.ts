import { create } from "zustand";
import { Category } from "../types/habit.types";
import { CategoryDB } from "./categoryDB";

type CategoryState = {
    categories: Category[];

    loadCategories: () => void;
    addCategory: (category: Omit<Category, "id" | "createdAt">) => Promise<number>;
    updateCategory: (id: number, data: Partial<Omit<Category, "id" | "createdAt">>) => void;
    deleteCategory: (id: number) => void;

    getCategoryById: (id: number) => Category | null;
};

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],

    loadCategories: async () => {
        const list = await CategoryDB.getAll();
        set({ categories: list });
    },

    addCategory: async (cat) => {
        const id = await CategoryDB.add(cat);
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
    },

    getCategoryById: (id) =>
        get().categories.find(c => c.id === id) || null,
}));
