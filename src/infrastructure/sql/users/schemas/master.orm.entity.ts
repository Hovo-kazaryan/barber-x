import {
  ChildEntity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserSQL } from './user.orm.entity';
import { PlannerSQL } from '../../planner/schemas/planner.orm';

@ChildEntity()
export class MasterSQL extends UserSQL {
  @Column({ nullable: true })
  specialty?: string;

  @Column({ nullable: true })
  experienceYears?: number;

  @ManyToOne(() => PlannerSQL)
  @JoinColumn({ name: 'planner' })
  planner: PlannerSQL;
}
