export abstract class AbstractPlanner {
  masterId: string;

  // Days of the week the master always takes off (0 = Sunday, 6 = Saturday)
  recurringHolidays?: number[]; // e.g., [0, 6]

  // Specific dates (YYYY-MM-DD) the master is off
  dayOffDates?: Date[]; // e.g., [2025-04-14, 2025-04-28]

  // Lunch break within a day (optional)
  lunchBreak?: { start: string; end: string }; // e.g., { start: '13:00', end: '14:00' }

  // Weekly default working hours (per weekday)
  weeklySchedule?: {
    [dayOfWeek: number]: { start: string; end: string } | null;
  };
}
