import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AdminSQL } from '../schemas/admin.orm';
import { USER_ROLES } from 'src/shared/constants';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

export class AdminSQLService implements IUserRepository {
  constructor(
    @InjectRepository(AdminSQL)
    private readonly clientRepo: Repository<AdminSQL>,
  ) {}

  create(user: AbstractUser): Promise<AbstractUser> {
    return null;
  }

  delete(id: string): Promise<boolean> {
    return null;
  }

  getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    return null;
  }
}
