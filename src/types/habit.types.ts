export interface Habit {
    id: number;
    title: string;
    description?: string | null;
    scheduleType: 'daily' | 'weekly';
    daysOfWeek?: string | null;
    icon?: string | null;
    color?: string | null;
    categoryId?: number | null;
    startDate: string;
    createdAt: string;
    reminderTime?: string | null;
    reminderMessage?: string | null;
    notificationId?: string | null;
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
