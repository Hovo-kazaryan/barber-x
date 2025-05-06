import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModuleSQL } from 'src/infrastructure/sql/users/users.sql.module';
import { UserModuleMongo } from 'src/infrastructure/mongo/users/users.mongo.module';

@Module({
  imports: [UserModuleMongo, UserModuleSQL],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
