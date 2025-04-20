import { JwtPayload } from 'src/infrastructure/auth/strategies/payload.types';

export interface IAuthRepository {
  validateUser(payload: JwtPayload): Promise<boolean>;
}
