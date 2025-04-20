import { Injectable } from '@nestjs/common';

import { UserRoleFactory } from './strategies/user-role.factory';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { USER_ROLES } from 'src/shared/constants';
import { JwtPayload } from 'src/infrastructure/auth/strategies/payload.types';

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
    const creator = this.userRoleFactory.getCreator(createUserDto.role);
    return creator.create(createUserDto);
  }

  async getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    const entity = this.userRoleFactory.getCreator(role);
    return await entity.getByEmail(email);
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    const entity = await this.getByEmail(payload.email, payload.role);
    if (entity) {
      return true;
    }
    return false;
  }
}
