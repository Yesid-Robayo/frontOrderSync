export function formatDate(fullDate: string): string {
    const dateObj = new Date(fullDate);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    return `${month} ${day}`;
}