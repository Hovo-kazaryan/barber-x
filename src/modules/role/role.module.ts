import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RolesSQLModule } from 'src/infrastructure/sql/roles/roles.sql.module';

@Module({
  imports: [RolesSQLModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
