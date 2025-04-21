import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ERROR_MESSAGES } from 'src/shared/messages';
import { USER_REPOSITORY_MONGO } from 'src/shared/tokens';
import { IAuthRepository } from 'src/core/auth/interfaces/auth-repository.interface';
import {
  JwtPayload,
  LoginPayload,
} from 'src/infrastructure/shared/auth/strategies/payload.types';
import { AuthenticatedUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

@Injectable()
export class MongoAuthRepo implements IAuthRepository {
  constructor(
    @Inject(USER_REPOSITORY_MONGO)
    private readonly service: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(payload: JwtPayload): Promise<boolean> {
    const entity = await this.service.getByEmail(payload.email, payload.role);
    if (entity) {
      return true;
    }
    return false;
  }

  async login(payload: LoginPayload): Promise<AuthenticatedUser> {
    const entity = await this.service.getByEmail(payload.email, payload.role);
    if (!entity) {
      throw new UnprocessableEntityException({
        password: ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD,
      });
    }
    const jwtPayload: JwtPayload = {
      sub: entity._id,
      role: entity.role,
      email: entity.email,
    };
    const accessToken = this.jwtService.sign(jwtPayload);
    return { ...entity, accessToken };
  }
}
