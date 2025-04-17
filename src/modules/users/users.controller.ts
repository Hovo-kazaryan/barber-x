import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { USER_ROLES } from 'src/shared/constants';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { AbstractUser } from 'src/core/users/entities/user.abstract';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto): Promise<AbstractUser> {
    return this.usersService.create(body);
  }

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
}
