import { AbstractUser } from './user.abstract';
import { Planner } from 'src/core/planner/entities/planner.entity';

export class Master extends AbstractUser {
  planner: Planner;
}
