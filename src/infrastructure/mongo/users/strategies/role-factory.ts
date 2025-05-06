import { Injectable } from '@nestjs/common';

import { AdminUserStrategy } from './admin-user.service';
import { ClientUserStrategy } from './client-user.service';
import { MasterUserStrategy } from './master-user.service';

import { USER_ROLES } from 'src/shared/constants';
import { UserRoleFactory } from 'src/infrastructure/shared/users/user-role-factory';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

@Injectable()
export class MongoUserRoleFactory extends UserRoleFactory {
  constructor(
    private readonly admin: AdminUserStrategy,
    private readonly client: ClientUserStrategy,
    private readonly master: MasterUserStrategy,
  ) {
    const roleMap: Record<USER_ROLES, IUserRepository> = {
      [USER_ROLES.ADMIN]: admin,
      [USER_ROLES.CLIENT]: client,
      [USER_ROLES.MASTER]: master,
    };
    super(roleMap);
  }
}
