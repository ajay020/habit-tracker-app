export type Habit = {
    id: number;
    title: string;
    description: string;
    scheduleType: "daily" | "weekly";
    daysOfWeek: string | null;
    startDate: string;
    createdAt: string;
};

export type HabitCompletion = {
    id: number;
    habitId: number;
    date: string; // "YYYY-MM-DD"
};
