import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_MONGO } from 'src/shared/tokens';
import { JwtPayload } from 'src/infrastructure/auth/strategies/payload.types';
import { IAuthRepository } from 'src/core/auth/interfaces/auth-repository.interface';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

@Injectable()
export class AuthService implements IAuthRepository {
  constructor(
    @Inject(USER_REPOSITORY_MONGO)
    private readonly service: IUserRepository,
  ) {}
  validateUser(payload: JwtPayload): Promise<boolean> {
    return this.service.validateUser(payload);
  }
}
