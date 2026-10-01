export type CalendarDate = `${number}-${number}-${number}`;

export const CALENDAR_DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function isCalendarDate(value: string): value is CalendarDate {
  if (!CALENDAR_DATE_PATTERN.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);

  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

export function formatCalendarDate(date: CalendarDate): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: undefined,
    timeZone: "UTC",
  }).format(calendarDateToDate(date));
}

export function getCalendarYear(date: CalendarDate): number {
  return Number(date.slice(0, 4));
}

export function calendarDateToDate(date: CalendarDate): Date {
  return new Date(`${date}T00:00:00.000Z`);
}
