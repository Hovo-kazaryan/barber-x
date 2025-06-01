import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ClientSQL } from '../schemas/client.orm.entity';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { RpcException } from '@nestjs/microservices';
import { ERROR_MESSAGES } from 'src/shared/messages';
import { RolesRepository } from '../../roles/roles.repository';

export class ClientSQLService implements IUserRepository {
  constructor(
    @InjectRepository(ClientSQL)
    private readonly clientRepo: Repository<ClientSQL>,

    private readonly roleRepo: RolesRepository,
  ) {}

  async create(user: AbstractUser): Promise<AbstractUser> {
    const isExists = await this.clientRepo.findOne({
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
    const role = await this.roleRepo.getRoleByName(user.role);
    const master = this.clientRepo.create({ ...user, role: role });
    await this.clientRepo.save(master);
    return { ...master, role: role.name };
  }

  delete(id: string): Promise<boolean> {
    return null;
  }

  async getByEmail(email: string): Promise<AbstractUser> {
    const master = await this.clientRepo.findOne({ where: { email } });
    if (!master) {
      throw new RpcException({
        statusCode: 404,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }
    const role = await this.roleRepo.getRoleById(master.role._id);

    return { ...master, role: role.name };
  }
}
