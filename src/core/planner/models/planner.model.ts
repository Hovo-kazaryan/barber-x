import { AbstractPlanner } from '../entities/abstract.planner';

export class Planner implements AbstractPlanner {
  constructor(
    public master: string,
    public recurringHolidays: number[],
    public dayOffDates?: Date[],
    public lunchBreak?: { start: string; end: string },
    public weeklySchedule?: {
      [dayOfWeek: number]: { start: string; end: string } | null;
    },
  ) {}
}
