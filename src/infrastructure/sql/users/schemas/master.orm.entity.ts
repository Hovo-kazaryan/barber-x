import { ChildEntity, Column, JoinColumn, OneToOne } from 'typeorm';
import { UserSQL } from './user.orm.entity';
import { PlannerSQL } from '../../planners/schemas/planner.orm.entity';

@ChildEntity()
export class MasterSQL extends UserSQL {
  @Column({ nullable: true })
  specialty?: string;

  @Column({ nullable: true })
  experienceYears?: number;

  @OneToOne(() => PlannerSQL)
  @JoinColumn({ name: 'planner' })
  planner: PlannerSQL;
}
