import { Module } from '@nestjs/common';
import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';
import { PlannerSQLModule } from 'src/infrastructure/sql/planner/planner.sql.module';

@Module({
  imports: [PlannerSQLModule],
  controllers: [PlannerController],
  providers: [PlannerService],
})
export class PlannerModule {}
