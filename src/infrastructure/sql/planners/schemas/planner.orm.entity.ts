import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MasterSQL } from '../../users/schemas/master.orm.entity';

type StartEndType = {
  start: string;
  end: string;
};

@Entity()
export class PlannerSQL {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @OneToOne(() => MasterSQL, { eager: true })
  @JoinColumn({ name: 'master' })
  master: MasterSQL;

  @Column({ type: 'simple-array' })
  recurringHolidays: number[];

  @Column({ type: 'simple-array' })
  dayOffDates: Date[];

  @Column({ type: 'json' })
  lunchBreak: StartEndType;

  @Column({
    type: 'json',
    nullable: true,
  })
  weeklySchedule: {
    [dayOfWeek: number]: StartEndType | null;
  };
}
