import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MasterSQL } from '../../users/schemas/master.orm.entity';

@Entity()
export class PlannerSQL {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @OneToOne(() => MasterSQL, (master) => master.planner)
  @JoinColumn({ name: 'master' })
  master: MasterSQL;

  @Column('simple-array')
  recurringHolidays: number[];

  @Column('simple-array')
  dayOffDates: Date[];

  @Column()
  lunchBreakStart: string;

  @Column()
  lunchBreakEnd: string;

  get lunchBreak(): { start: string; end: string } {
    return {
      start: this.lunchBreakStart,
      end: this.lunchBreakEnd,
    };
  }

  set lunchBreak(value: { start: string; end: string }) {
    this.lunchBreakStart = value.start;
    this.lunchBreakEnd = value.end;
  }

  @Column({
    type: 'json',
    nullable: true,
  })
  weeklySchedule: {
    [dayOfWeek: number]: { start: string; end: string } | null;
  };
}
