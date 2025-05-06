import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoUserRepository } from './user.repository';
import { USER_REPOSITORY_MONGO } from 'src/shared/tokens';

import { UserMongo, UserSchema } from './schemas/user.schema';
import { AdminMongo, AdminSchema } from './schemas/admin.schema';
import { Planner, PlannerSchema } from './schemas/planner.schema';
import { ClientMongo, ClientSchema } from './schemas/client.schema';
import { MasterMongo, MasterSchema } from './schemas/master.schema';

import { MongoUserRoleFactory } from './strategies/role-factory';
import { AdminUserStrategy } from './strategies/admin-user.service';
import { MasterUserStrategy } from './strategies/master-user.service';
import { ClientUserStrategy } from './strategies/client-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMongo.name, schema: UserSchema },
      { name: Planner.name, schema: PlannerSchema },
      { name: AdminMongo.name, schema: AdminSchema },
      { name: ClientMongo.name, schema: ClientSchema },
      { name: MasterMongo.name, schema: MasterSchema },
    ]),
  ],
  providers: [
    AdminUserStrategy,
    MasterUserStrategy,
    ClientUserStrategy,
    MongoUserRoleFactory,
    {
      useClass: MongoUserRepository,
      provide: USER_REPOSITORY_MONGO,
    },
  ],
  exports: [USER_REPOSITORY_MONGO],
})
export class UserModuleMongo {}
