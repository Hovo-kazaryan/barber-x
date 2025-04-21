import { Injectable } from '@nestjs/common';

import { USER_ROLES } from 'src/shared/constants';
import { UserRoleFactory } from './strategies/user-role.factory';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
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

  async create(createUserDto: CreateUserDto): Promise<AbstractUser> {
    const strategy = this.userRoleFactory.getStrategy(createUserDto.role);
    return strategy.create(createUserDto);
  }

  async getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    const strategy = this.userRoleFactory.getStrategy(role);
    return await strategy.getByEmail(email);
  }
}
