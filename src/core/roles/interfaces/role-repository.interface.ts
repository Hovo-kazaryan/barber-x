import { USER_ROLES } from 'src/shared/constants';
import { RoleSQL } from 'src/infrastructure/sql/roles/schemas/roles.orm';

export interface IRoleRepository {
  getRoleById(roleId: string): Promise<RoleSQL>;
  createRole(role: USER_ROLES): Promise<RoleSQL>;
  getRoleByName(roleName: USER_ROLES): Promise<RoleSQL>;
}
