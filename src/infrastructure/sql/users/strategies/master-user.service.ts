import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MasterSQL } from '../schemas/master.orm.entity';

import { USER_ROLES } from 'src/shared/constants';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

export class MasterSQLService implements IUserRepository {
  constructor(
    @InjectRepository(MasterSQL)
    private readonly masterRepo: Repository<MasterSQL>,
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
