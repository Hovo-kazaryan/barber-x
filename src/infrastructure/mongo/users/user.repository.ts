import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserMongo } from './schemas/user.schema';
import { Planner, PlannerDocument } from './schemas/planner.schema';

import { UserRoleFactory } from './strategies/user-role.factory';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

@Injectable()
export class MongoUserRepository implements IUserRepository {
  constructor(private readonly userRoleFactory: UserRoleFactory) {}
  delete(id: string): Promise<boolean> {
    return null;
  }

  findAll(): Promise<AbstractUser[]> {
    return null;
  }

  findById(id: string): Promise<AbstractUser | null> {
    return null;
  }

  async create(user: AbstractUser): Promise<AbstractUser> {
    const creator = this.userRoleFactory.getCreator(user.role);
    return await creator.create(user);
  }
}
