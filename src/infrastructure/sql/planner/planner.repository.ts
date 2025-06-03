import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PlannerSQL } from './schemas/planner.orm';
import { Planner } from 'src/core/planner/entities/planner.entity';
import { MasterSQLService } from '../users/strategies/master-user.service';
import { AbstractPlanner } from 'src/core/planner/entities/abstract.planner';
import { IPlannerRepository } from 'src/core/planner/interfaces/planner-repository.interface';
import { MasterSQL } from '../users/schemas/master.orm.entity';

@Injectable()
export class SQLPlannerRepository implements IPlannerRepository {
  constructor(
    @InjectRepository(PlannerSQL)
    private readonly plannerModel: Repository<PlannerSQL>,
    private readonly masterService: MasterSQLService,
  ) {}

  async createPlanner(masterId: string): Promise<AbstractPlanner> {
    const isExists = await this.plannerModel.findOne({
      where: { master: { _id: masterId } },
    });

    if (isExists) {
      throw new Error('Planner is already created');
    }

    const master = (await this.masterService.getById(
      masterId,
    )) as unknown as MasterSQL;
    if (!master) {
      throw new Error('Master not found');
    }

    const planner = this.plannerModel.create({ master });
    const abstractPlanner = new Planner(
      master._id,
      planner.dayOffDates,
      planner.recurringHolidays,
      planner.lunchBreak,
      planner.weeklySchedule,
    );
    await this.plannerModel.save(planner);
    return abstractPlanner;
  }
}
