import { Injectable } from '@nestjs/common';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { USER_ROLES } from 'src/shared/constants';
import { SQLUserRoleFactory } from './strategies/role-factory';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';

@Injectable()
export class SQLUserRepository implements IUserRepository {
  constructor(private readonly roleFactory: SQLUserRoleFactory) {}

  create(data: CreateUserDto): Promise<AbstractUser> {
    const strategy = this.roleFactory.getStrategy(data.role);
    return strategy.create(data);
  }

  delete(id: string): Promise<boolean> {
    return null;
  }

  getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    const strategy = this.roleFactory.getStrategy(role);
    return strategy.getByEmail(email, role);
  }
}
