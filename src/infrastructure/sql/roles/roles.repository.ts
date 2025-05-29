import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { RoleSQL } from './schemas/roles.orm';
import { USER_ROLES } from 'src/shared/constants';
import { ERROR_MESSAGES } from 'src/shared/messages';
import { IRoleRepository } from 'src/core/roles/interfaces/role-repository.interface';

@Injectable()
export class RolesRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleSQL)
    private readonly rolesModel: Repository<RoleSQL>,
  ) {}

  async getRoleById(roleId: string): Promise<RoleSQL> {
    const role = await this.rolesModel.findOneBy({ _id: roleId });
    return role;
  }

  async getRoleByName(roleName: USER_ROLES): Promise<RoleSQL> {
    const role = await this.rolesModel.findOneBy({ name: roleName });
    return role;
  }

  async createRole(role: USER_ROLES): Promise<RoleSQL> {
    const isExists = await this.getRoleByName(role);
    if (isExists) {
      throw new RpcException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fields: {
          role: ERROR_MESSAGES.ROLE_IN_USE,
        },
      });
    }
    const newRole = this.rolesModel.create({ name: role });
    await this.rolesModel.save(newRole);
    return newRole;
  }
}
