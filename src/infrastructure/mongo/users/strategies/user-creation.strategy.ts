import { AbstractUser } from 'src/core/users/entities/user.abstract';

export interface UserCreationStrategy {
  create(payload: any): Promise<AbstractUser>;
  getById(id: string): Promise<AbstractUser>;
  getByEmail(email: string): Promise<AbstractUser>;
}
