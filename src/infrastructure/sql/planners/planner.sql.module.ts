import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerSQL } from './schemas/planner.orm.entity';
import { PlannerSQLRepository } from './planner.repository';
import { MasterSQL } from '../users/schemas/master.orm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterSQL, PlannerSQL])],
  providers: [PlannerSQLRepository],
  exports: [PlannerSQLRepository],
})
export class PlannerSQLModule {}
