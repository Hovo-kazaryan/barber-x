import { Injectable } from '@nestjs/common';
import { AbstractUser } from 'src/core/users/entities/user.abstract';
import { IUserRepository } from 'src/core/users/interfaces/user-repository.interface';

// implements IUserRepository
@Injectable()
export class SQLUserRepository {
  // delete(id: string): Promise<void> {
  //   return null;
  // }
  // findAll(): Promise<AbstractUser[]> {
  //   return null;
  // }
  // findById(id: string): Promise<AbstractUser | null> {
  //   return null;
  // }
  // create(user: AbstractUser): Promise<void> {
  //   return null;
  // }
}
