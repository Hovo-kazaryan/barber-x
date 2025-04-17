import { Inject, Injectable } from '@nestjs/common';
import { USER_ROLES } from 'src/shared/constants';
import { AdminUserCreator } from './admin-user.service';
import { MasterUserCreator } from './master-user.service';
import { ClientUserCreator } from './client-user.service';
import { UserCreationStrategy } from './user-creation.strategy';

@Injectable()
export class UserRoleFactory {
  constructor(
    @Inject()
    private readonly adminCreator: AdminUserCreator,
    @Inject()
    private readonly clientCreator: ClientUserCreator,
    @Inject()
    private readonly masterCreator: MasterUserCreator,
  ) {}

  getCreator(role: USER_ROLES): UserCreationStrategy {
    const roleMap: Record<USER_ROLES, UserCreationStrategy> = {
      [USER_ROLES.ADMIN]: this.adminCreator,
      [USER_ROLES.CLIENT]: this.clientCreator,
      [USER_ROLES.MASTER]: this.masterCreator,
    };

    return roleMap[role];
  }
}
