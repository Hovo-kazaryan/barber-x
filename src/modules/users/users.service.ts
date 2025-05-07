import { Inject, Injectable } from '@nestjs/common';

import { USER_ROLES } from 'src/shared/constants';
import { USER_REPOSITORY_SQL } from 'src/shared/tokens';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY_SQL)
    private readonly service: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AbstractUser> {
    return await this.service.create(createUserDto);
  }

  async getUserByEmailAndRole(
    email: string,
    role: USER_ROLES,
  ): Promise<AbstractUser> {
    return await this.service.getByEmail(email, role);
  }
}
