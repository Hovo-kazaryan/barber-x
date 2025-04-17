import { Injectable } from '@nestjs/common';
import { UserRoleFactory } from './user-role.factory';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { USER_ROLES } from 'src/shared/constants';

@Injectable()
export class MongoService {
  constructor(private readonly userFactory: UserRoleFactory) {}

  async create(createUserDto: CreateUserDto): Promise<AbstractUser> {
    const creator = this.userFactory.getCreator(createUserDto.role);
    return creator.create(createUserDto);
  }

  async getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser> {
    const entity = this.userFactory.getCreator(role);
    return await entity.getByEmail(email);
  }
}
