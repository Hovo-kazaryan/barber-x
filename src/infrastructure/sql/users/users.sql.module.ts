import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSQL } from './schemas/user.orm.entity';
import { MasterSQL } from './schemas/master.orm.entity';
import { AdminSQL } from './schemas/admin.orm';
import { ClientSQL } from './schemas/client.orm';

import { SQLUserRepository } from './user.repository';
import { USER_REPOSITORY_SQL } from 'src/shared/tokens';
import { SQLUserRoleFactory } from './strategies/role-factory';
import { AdminSQLService } from './strategies/admin-user.service';
import { ClientSQLService } from './strategies/client-user.service';
import { MasterSQLService } from './strategies/master-user.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserSQL, MasterSQL, AdminSQL, ClientSQL]),
  ],
  providers: [
    SQLUserRoleFactory,
    AdminSQLService,
    ClientSQLService,
    MasterSQLService,
    {
      provide: USER_REPOSITORY_SQL,
      useClass: SQLUserRepository,
    },
  ],

  exports: [USER_REPOSITORY_SQL],
})
export class UserModuleSQL {}
