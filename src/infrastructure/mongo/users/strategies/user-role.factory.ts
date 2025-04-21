import { Inject, Injectable } from '@nestjs/common';
import { USER_ROLES } from 'src/shared/constants';
import { AdminUserStrategy } from './admin-user.service';
import { MasterUserStrategy } from './master-user.service';
import { ClientUserStrategy } from './client-user.service';
import { UserCreationStrategy } from './user-creation.strategy';

@Injectable()
export class UserRoleFactory {
  constructor(
    @Inject()
    private readonly adminStrategy: AdminUserStrategy,
    @Inject()
    private readonly clientStrategy: ClientUserStrategy,
    @Inject()
    private readonly masterStrategy: MasterUserStrategy,
  ) {}

  getStrategy(role: USER_ROLES): UserCreationStrategy {
    const roleMap: Record<USER_ROLES, UserCreationStrategy> = {
      [USER_ROLES.ADMIN]: this.adminStrategy,
      [USER_ROLES.CLIENT]: this.clientStrategy,
      [USER_ROLES.MASTER]: this.masterStrategy,
    };

    return roleMap[role];
  }
}
