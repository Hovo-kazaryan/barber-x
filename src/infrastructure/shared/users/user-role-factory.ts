import { USER_ROLES } from 'src/shared/constants';
import { IUserRepository } from '../../../core/users/interfaces/user-repository.interface';

export class UserRoleFactory {
  constructor(private readonly roleMap: Record<USER_ROLES, IUserRepository>) {}

  getStrategy(role: USER_ROLES): IUserRepository {
    return this.roleMap[role];
  }
}
