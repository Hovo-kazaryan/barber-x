import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { USER_ROLES } from 'src/shared/constants';
import { Public } from 'src/shared/decorators/public.decorator';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { AbstractUser } from 'src/core/users/entities/user.abstract';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return 'Hello from user';
  }

  @Get('by-email/:email/:role')
  getByEmailAndRole(
    @Param('email') email: string,
    @Param('role') role: USER_ROLES,
  ): Promise<AbstractUser | null> {
    return this.usersService.getUserByEmailAndRole(email, role);
  }

  @Public()
  @MessagePattern('user_created')
  handleUserCreated(@Payload() data: any) {
    return this.usersService.create(data);
  }
}
