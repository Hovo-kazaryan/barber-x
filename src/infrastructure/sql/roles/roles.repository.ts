import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { RoleSQL } from './schemas/roles.orm';
import { USER_ROLES } from 'src/shared/constants';
import { ERROR_MESSAGES } from 'src/shared/messages';
import { RoleEntity } from 'src/core/roles/entities/role.entity';
import { CreateRoleDTO } from 'src/core/roles/dto/create-role.dto';
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

  async createRole(data: CreateRoleDTO): Promise<RoleSQL> {
    const isExists = await this.getRoleByName(data.role);
    if (isExists) {
      throw new UnprocessableEntityException({
        fields: {
          role: ERROR_MESSAGES.ROLE_IN_USE,
        },
      });
    }
    const newRole = this.rolesModel.create({ name: data.role });
    await this.rolesModel.save(newRole);
    return newRole;
  }

  async getRoles(): Promise<RoleEntity[]> {
    const roles = await this.rolesModel.find();
    return roles;
  }
}
