import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { USER_ROLES } from 'src/shared/constants';
import { Public } from 'src/shared/decorators/public.decorator';
import { AbstractUser } from 'src/core/users/entities/user.abstract';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return 'Hello from user';
  }

  @Public()
  @MessagePattern('get_user_by_email')
  getUserByEmail(
    @Payload() data: { email: string; role: USER_ROLES },
  ): Promise<AbstractUser | null> {
    return this.usersService.getUserByEmailAndRole(data.email, data.role);
  }

  @Public()
  @MessagePattern('user_created')
  handleUserCreated(@Payload() data: any) {
    return this.usersService.create(data);
  }

  @Public()
  @MessagePattern('get_users')
  handleGetUsers(@Payload() data: any) {
    return { hello: 'World' };
  }
}
