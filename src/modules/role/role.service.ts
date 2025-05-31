import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from 'src/core/roles/dto/create-role.dto';
import { RolesRepository } from 'src/infrastructure/sql/roles/roles.repository';
import { USER_ROLES } from 'src/shared/constants';

@Injectable()
export class RoleService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  getRoles() {
    return this.rolesRepository.getRoles();
  }

  async createRole(data: CreateRoleDTO) {
    const response = await this.rolesRepository.createRole(data);
    return response;
  }
}
