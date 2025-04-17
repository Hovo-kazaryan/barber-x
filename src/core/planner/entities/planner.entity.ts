import { AbstractPlanner } from './abstract.planner';

export class Planner extends AbstractPlanner {
  constructor(
    masterId: string,
    dayOffDates?: Date[],
    recurringHolidays?: number[],
    lunchBreak?: { start: string; end: string },
    weeklySchedule?: { [dayOfWeek: number]: { start: string; end: string } },
  ) {
    super();
  }
}
