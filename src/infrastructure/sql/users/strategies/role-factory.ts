import { Injectable } from '@nestjs/common';

import { AdminSQLService } from './admin-user.service';
import { ClientSQLService } from './client-user.service';
import { MasterSQLService } from './master-user.service';

import { USER_ROLES } from 'src/shared/constants';
import { UserRoleFactory } from 'src/infrastructure/shared/users/user-role-factory';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

@Injectable()
export class SQLUserRoleFactory extends UserRoleFactory {
  constructor(
    private readonly admin: AdminSQLService,
    private readonly client: ClientSQLService,
    private readonly master: MasterSQLService,
  ) {
    const roleMap: Record<USER_ROLES, IUserRepository> = {
      [USER_ROLES.ADMIN]: admin,
      [USER_ROLES.CLIENT]: client,
      [USER_ROLES.MASTER]: master,
    };
    super(roleMap);
  }
}
