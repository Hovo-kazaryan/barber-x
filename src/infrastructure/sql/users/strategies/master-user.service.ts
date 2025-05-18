import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { MasterSQL } from '../schemas/master.orm.entity';

import { ERROR_MESSAGES } from 'src/shared/messages';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MasterSQLService implements IUserRepository {
  constructor(
    @InjectRepository(MasterSQL)
    private readonly masterRepo: Repository<MasterSQL>,
  ) {}

  async create(user: AbstractUser): Promise<AbstractUser> {
    const isExists = await this.masterRepo.findOne({
      where: { email: user.email },
    });

    if (isExists) {
      throw new RpcException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fields: {
          email: ERROR_MESSAGES.EMAIL_IN_USE,
        },
      });
    }

    const master = this.masterRepo.create(user);
    return await this.masterRepo.save(master);
  }

  delete(id: string): Promise<boolean> {
    return null;
  }

  async getByEmail(email: string): Promise<AbstractUser> {
    const master = await this.masterRepo.findOne({ where: { email } });
    if (!master) {
      throw new RpcException({
        statusCode: 404,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }
    return master;
  }
}
