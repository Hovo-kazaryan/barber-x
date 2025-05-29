import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSQL } from './schemas/roles.orm';
import { RolesRepository } from './roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleSQL])],
  providers: [RolesRepository],
  exports: [RolesRepository],
})
export class RolesSQLModule {}
