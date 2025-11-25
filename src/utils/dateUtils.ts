import { Habit } from "../types/habit.types";

const formatDate = (d: Date) => d.toISOString().split("T")[0];

function subtractDays(dateString: string, days: number) {
    const d = new Date(dateString);
    d.setDate(d.getDate() - days);
    return formatDate(d);
}

function isConsecutive(prev: string, next: string) {
    return subtractDays(next, 1) === prev;
}

function getScheduledDaysBetween(habit: Habit, start: Date, end: Date) {
    let count = 0;

    const schedule = habit.scheduleType;
    const weeklyDays = habit.daysOfWeek?.split(",") || [];

    const current = new Date(start);

    while (current <= end) {
        const weekday = current.getDay().toString();

        if (schedule === "daily") {
            count++;
        } else if (schedule === "weekly" && weeklyDays.includes(weekday)) {
            count++;
        }

        current.setDate(current.getDate() + 1);
    }

    return count;
}


export { formatDate, getScheduledDaysBetween, isConsecutive, subtractDays };

