import { USER_ROLES } from 'src/shared/constants';
import { AbstractUser } from '../entities/user.abstract';

export interface IUserRepository {
  delete(id: string): Promise<boolean>;
  create(user: AbstractUser): Promise<AbstractUser>;
  getByEmail(email: string, role: USER_ROLES): Promise<AbstractUser>;
}
