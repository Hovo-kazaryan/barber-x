import { USER_ROLES } from 'src/shared/constants';
import { RoleSQL } from 'src/infrastructure/sql/roles/schemas/roles.orm';
import { RoleEntity } from '../entities/role.entity';
import { CreateRoleDTO } from '../dto/create-role.dto';

export interface IRoleRepository {
  getRoles(): Promise<RoleEntity[]>;
  getRoleById(roleId: string): Promise<RoleSQL>;
  createRole(role: CreateRoleDTO): Promise<RoleSQL>;
  getRoleByName(roleName: USER_ROLES): Promise<RoleSQL>;
}
