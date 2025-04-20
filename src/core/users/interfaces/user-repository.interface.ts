import { USER_ROLES } from 'src/shared/constants';
import { AbstractUser } from '../entities/user.abstract';

export interface IUserRepository {
  findAll(): Promise<AbstractUser[]>;
  delete(id: string): Promise<boolean>;
  create(user: AbstractUser): Promise<AbstractUser>;
  findById(id: string): Promise<AbstractUser | null>;
  getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser>;
}
