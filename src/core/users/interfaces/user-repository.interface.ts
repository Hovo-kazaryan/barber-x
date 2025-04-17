import { AbstractUser } from '../entities/user.abstract';

export interface IUserRepository {
  findAll(): Promise<AbstractUser[]>;
  delete(id: string): Promise<boolean>;
  create(user: AbstractUser): Promise<AbstractUser>;
  findById(id: string): Promise<AbstractUser | null>;
}
