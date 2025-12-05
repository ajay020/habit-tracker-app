export interface Habit {
    id: number;
    title: string;
    description?: string;
    scheduleType: 'daily' | 'weekly';
    daysOfWeek?: string;
    icon?: string;
    color?: string;
    categoryId?: number;
    startDate: string;
    createdAt: string;
}

// Extended Habit type with category data (for display purposes)
export interface HabitWithCategory extends Habit {
    category?: Category;
}

export type HabitCompletion = {
    id: number;
    habitId: number;
    date: string; // "YYYY-MM-DD"
};

export interface Category {
    id: number;
    title: string;
    icon: string;
    color: string;
    createdAt: string;
}
