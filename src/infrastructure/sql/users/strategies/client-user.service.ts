import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { USER_ROLES } from 'src/shared/constants';
import { ClientSQL } from '../schemas/client.orm';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { RpcException } from '@nestjs/microservices';
import { ERROR_MESSAGES } from 'src/shared/messages';

export class ClientSQLService implements IUserRepository {
  constructor(
    @InjectRepository(ClientSQL)
    private readonly clientRepo: Repository<ClientSQL>,
  ) {}

  async create(user: AbstractUser): Promise<AbstractUser> {
    const isExists = await this.clientRepo.findOne({
      where: { email: user.email },
    });

    if (isExists) {
      throw new RpcException({
        email: ERROR_MESSAGES.EMAIL_IN_USE,
      });
    }

    const master = this.clientRepo.create(user);
    return await this.clientRepo.save(master);
  }

  delete(id: string): Promise<boolean> {
    return null;
  }

  getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    return null;
  }
}
