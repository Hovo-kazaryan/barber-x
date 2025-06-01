import { Body, Controller, Post } from '@nestjs/common';
import { LoginPayload } from 'src/infrastructure/shared/auth/strategies/payload.types';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @MessagePattern('login')
  login(@Body() body: LoginPayload) {
    return this.service.login(body);
  }
}
