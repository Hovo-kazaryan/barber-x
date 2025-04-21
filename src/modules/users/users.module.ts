import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { USER_REPOSITORY_MONGO } from 'src/shared/tokens';
import { MongoUserRepository } from 'src/infrastructure/mongo/users/user.repository';
import {
  UserMongo,
  UserSchema,
} from 'src/infrastructure/mongo/users/schemas/user.schema';
import { Planner } from 'src/core/planner/entities/planner.entity';
import { PlannerSchema } from 'src/infrastructure/mongo/users/schemas/planner.schema';
import { AdminUserStrategy } from 'src/infrastructure/mongo/users/strategies/admin-user.service';
import {
  MasterMongo,
  MasterSchema,
} from 'src/infrastructure/mongo/users/schemas/master.schema';
import { UserRoleFactory } from 'src/infrastructure/mongo/users/strategies/user-role.factory';
import { ClientUserStrategy } from 'src/infrastructure/mongo/users/strategies/client-user.service';
import { MasterUserStrategy } from 'src/infrastructure/mongo/users/strategies/master-user.service';
import {
  AdminMongo,
  AdminSchema,
} from 'src/infrastructure/mongo/users/schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMongo.name, schema: UserSchema },
      { name: Planner.name, schema: PlannerSchema },
      { name: AdminMongo.name, schema: AdminSchema },
      { name: MasterMongo.name, schema: MasterSchema },
    ]),
  ],
  providers: [
    UsersService,
    UserRoleFactory,
    AdminUserStrategy,
    MasterUserStrategy,
    ClientUserStrategy,
    {
      provide: USER_REPOSITORY_MONGO,
      useClass: MongoUserRepository,
    },
  ],
  controllers: [UsersController],
  exports: [USER_REPOSITORY_MONGO],
})
export class UsersModule {}
