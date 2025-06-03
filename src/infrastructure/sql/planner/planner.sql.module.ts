import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerSQL } from './schemas/planner.orm';
import { RolesSQLModule } from '../roles/roles.sql.module';
import { SQLPlannerRepository } from './planner.repository';
import { MasterSQL } from '../users/schemas/master.orm.entity';
import { MasterSQLService } from '../users/strategies/master-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlannerSQL, MasterSQL]), RolesSQLModule],
  providers: [SQLPlannerRepository, MasterSQLService],
  exports: [SQLPlannerRepository],
})
export class PlannerSQLModule {}
