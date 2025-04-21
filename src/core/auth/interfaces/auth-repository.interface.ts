import { AuthenticatedUser } from 'src/core/users/entities/user.abstract';
import {
  JwtPayload,
  LoginPayload,
} from 'src/infrastructure/shared/auth/strategies/payload.types';

export interface IAuthRepository {
  validateUser(payload: JwtPayload): Promise<boolean>;
  login(payload: LoginPayload): Promise<AuthenticatedUser>;
}
