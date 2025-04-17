import { USER_ROLES } from 'src/shared/constants';
import { AbstractUser } from '../entities/user.abstract';

export class User implements AbstractUser {
  constructor(
    public _id: string,
    public name: string,
    public surname: string,
    public phone: string,
    public email: string,
    public role: USER_ROLES,
    public avatar?: string,
    public rating?: number,
    public bankCard?: {
      number: string;
      expiry: string;
      cvv?: string;
    },
  ) {}
}
