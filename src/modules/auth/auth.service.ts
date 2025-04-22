import { Inject, Injectable } from '@nestjs/common';
import {
  AUTH_REPOSITORY_MONGO,
  USER_REPOSITORY_MONGO,
} from 'src/shared/tokens';
import {
  JwtPayload,
  LoginPayload,
} from 'src/infrastructure/shared/auth/strategies/payload.types';
import { AuthenticatedUser } from 'src/core/users/entities/user.abstract';
import { IAuthRepository } from 'src/core/auth/interfaces/auth-repository.interface';

@Injectable()
export class AuthService implements IAuthRepository {
  constructor(
    @Inject(AUTH_REPOSITORY_MONGO)
    private readonly authService: IAuthRepository,
  ) {}
  validateUser(payload: JwtPayload): Promise<boolean> {
    return this.authService.validateUser?.(payload);
  }

  login(payload: LoginPayload): Promise<AuthenticatedUser> {
    return this.authService.login(payload);
  }
}
