import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { USER_ROLES } from 'src/shared/constants';
import { ClientSQL } from '../schemas/client.orm';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

export class ClientSQLService implements IUserRepository {
  constructor(
    @InjectRepository(ClientSQL)
    private readonly clientRepo: Repository<ClientSQL>,
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
