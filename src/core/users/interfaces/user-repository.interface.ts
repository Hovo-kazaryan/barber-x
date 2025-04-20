import { USER_ROLES } from 'src/shared/constants';
import { AbstractUser } from '../entities/user.abstract';
import { JwtPayload } from 'src/infrastructure/auth/strategies/payload.types';

export interface IUserRepository {
  findAll(): Promise<AbstractUser[]>;
  delete(id: string): Promise<boolean>;
  create(user: AbstractUser): Promise<AbstractUser>;
  findById(id: string): Promise<AbstractUser | null>;
  validateUser(payload: JwtPayload): Promise<boolean>;
  getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser>;
}
