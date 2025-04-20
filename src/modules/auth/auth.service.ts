import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';
import { JwtPayload } from 'src/infrastructure/auth/strategies/payload.types';
import { USER_REPOSITORY_MONGO } from 'src/shared/tokens';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_MONGO)
    private readonly service: IUserRepository,
  ) {}
  validateUser(payload: JwtPayload) {
    return this.service.validateUser(payload);
  }
}
