const formatDate = (d: Date) => d.toISOString().split("T")[0];

function subtractDays(dateString: string, days: number) {
    const d = new Date(dateString);
    d.setDate(d.getDate() - days);
    return formatDate(d);
}

function isConsecutive(prev: string, next: string) {
    return subtractDays(next, 1) === prev;
}

export { formatDate, subtractDays, isConsecutive };