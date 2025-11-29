const WEEK_DAYS = [
    { id: 0, label: "Sun" },
    { id: 1, label: "Mon" },
    { id: 2, label: "Tue" },
    { id: 3, label: "Wed" },
    { id: 4, label: "Thu" },
    { id: 5, label: "Fri" },
    { id: 6, label: "Sat" },
];


export function getDaysLabelsByIds(dayIds: number[]): string {
    const labels = WEEK_DAYS
        .filter((day) => dayIds.includes(day.id))
        .map((day) => day.label);
    return labels.join(", ");
}