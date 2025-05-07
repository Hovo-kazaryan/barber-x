import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { AdminSQL } from '../schemas/admin.orm';
import { USER_ROLES } from 'src/shared/constants';
import { ERROR_MESSAGES } from 'src/shared/messages';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

export class AdminSQLService implements IUserRepository {
  constructor(
    @InjectRepository(AdminSQL)
    private readonly adminRepo: Repository<AdminSQL>,
  ) {}

  async create(user: AbstractUser): Promise<AbstractUser> {
    const isExists = await this.adminRepo.findOne({
      where: { email: user.email },
    });

    if (isExists) {
      throw new RpcException({
        email: ERROR_MESSAGES.EMAIL_IN_USE,
      });
    }

    const master = this.adminRepo.create(user);
    return await this.adminRepo.save(master);
  }

  delete(id: string): Promise<boolean> {
    return null;
  }

  getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    return null;
  }
}
