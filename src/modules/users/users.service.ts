import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { MongoService } from 'src/infrastructure/mongo/users/strategies';
import { USER_ROLES } from 'src/shared/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MongoService)
    private readonly mongoService: MongoService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AbstractUser> {
    return await this.mongoService.create(createUserDto);
  }

  async getUserByEmailAndRole(
    email: string,
    role: USER_ROLES,
  ): Promise<AbstractUser> {
    return await this.mongoService.getByEmail(email, role);
  }
}
