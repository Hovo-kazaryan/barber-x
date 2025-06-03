import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { MasterSQL } from '../schemas/master.orm.entity';

import { ERROR_MESSAGES } from 'src/shared/messages';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { RolesRepository } from '../../roles/roles.repository';
import { SQLPlannerRepository } from '../../planner/planner.repository';

export class MasterSQLService implements IUserRepository {
  constructor(
    @InjectRepository(MasterSQL)
    private readonly masterRepo: Repository<MasterSQL>,

    private readonly roleRepository: RolesRepository,

    private readonly plannerRepository: SQLPlannerRepository,
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

    const role = await this.roleRepository.getRoleByName(user.role);
    const master = this.masterRepo.create({ ...user, role });
    await this.masterRepo.save(master);

    return { ...master, role: role.name };
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

    const role = await this.roleRepository.getRoleById(email);

    return { ...master, role: role.name };
  }

  async getById(_id: string): Promise<AbstractUser> {
    const master = await this.masterRepo.findOne({ where: { _id } });
    if (!master) {
      throw new RpcException({
        statusCode: 404,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }
    const role = await this.roleRepository.getRoleById(master.email);

    return { ...master, role: role.name };
  }
}
