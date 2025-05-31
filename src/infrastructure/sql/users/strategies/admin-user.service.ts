import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { AdminSQL } from '../schemas/admin.orm';
import { USER_ROLES } from 'src/shared/constants';
import { ERROR_MESSAGES } from 'src/shared/messages';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { RolesRepository } from '../../roles/roles.repository';

export class AdminSQLService implements IUserRepository {
  constructor(
    @InjectRepository(AdminSQL)
    private readonly adminRepo: Repository<AdminSQL>,
    private readonly roleRepository: RolesRepository,
  ) {}

  async create(user: AbstractUser): Promise<AbstractUser> {
    const isExists = await this.adminRepo.findOne({
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
    const role = await this.roleRepository.getRoleByName(user.role);
    const master = this.adminRepo.create({ ...user, role });
    await this.adminRepo.save(master);
    return { ...master, role: role.name };
  }

  delete(id: string): Promise<boolean> {
    return null;
  }

  async getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new RpcException({
        statusCode: 404,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }

    return { ...admin, role };
  }
}
