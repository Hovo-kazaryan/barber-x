import { AbstractPlanner } from '../entities/abstract.planner';

export interface IPlannerRepository {
  createPlanner: (masterId: string) => Promise<AbstractPlanner>;
  // pickDate: (date: Date) => Promise<boolean>;
  // updateDate: () =>
}
