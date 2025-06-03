import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlannerSQL } from './schemas/planner.orm.entity';
import { MasterSQL } from '../users/schemas/master.orm.entity';

@Injectable()
export class PlannerSQLRepository {
  constructor(
    @InjectRepository(MasterSQL)
    private readonly masterModel: Repository<MasterSQL>,

    @InjectRepository(PlannerSQL)
    private readonly plannerModel: Repository<PlannerSQL>,
  ) {}

  async createRepo(masterId: string) {
    const master = await this.masterModel.findOne({ where: { _id: masterId } });
    if (!master) {
      throw new Error('Planner is not created for user ' + masterId);
    }
    const isExist = await this.plannerModel.findOne({ where: { master } });
    if (isExist) {
      console.warn('Planner is already created!');
      return isExist;
    }

    const planner = this.plannerModel.create({
      recurringHolidays: [6, 7],
      lunchBreak: { start: '09:00', end: '18:00' },
      dayOffDates: [],
      master: master,
      weeklySchedule: [],
    });
    await this.plannerModel.save(planner);
    return planner;
  }
}
