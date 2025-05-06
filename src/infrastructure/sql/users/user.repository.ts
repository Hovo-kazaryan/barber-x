import { Injectable } from '@nestjs/common';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { USER_ROLES } from 'src/shared/constants';

@Injectable()
export class SQLUserRepository implements IUserRepository {
  async create(user: AbstractUser): Promise<AbstractUser> {
    return await user;
  }

  delete(id: string): Promise<boolean> {
    return null;
  }

  getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    return null;
  }
}
