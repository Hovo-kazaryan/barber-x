import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

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
import { AdminUserCreator } from 'src/infrastructure/mongo/users/strategies/admin-user.service';
import {
  MasterMongo,
  MasterSchema,
} from 'src/infrastructure/mongo/users/schemas/master.schema';
import { ClientUserCreator } from 'src/infrastructure/mongo/users/strategies/client-user.service';
import { UserRoleFactory } from 'src/infrastructure/mongo/users/strategies/user-role.factory';
import { MasterUserCreator } from 'src/infrastructure/mongo/users/strategies/master-user.service';
import {
  AdminMongo,
  AdminSchema,
} from 'src/infrastructure/mongo/users/schemas/admin.schema';
import { Master } from 'src/core/users/entities/master.entity';
import { MongoService } from 'src/infrastructure/mongo/users/strategies';

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
    MongoService,
    UsersService,
    UserRoleFactory,
    AdminUserCreator,
    MasterUserCreator,
    ClientUserCreator,
    {
      provide: USER_REPOSITORY_MONGO, // key point: provide interface token
      useClass: MongoUserRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
