import { USER_ROLES } from 'src/shared/constants';

export abstract class AbstractUser {
  _id?: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  avatar?: string;
  rating?: number;
  bankCard?: {
    number: string;
    expiry: string;
    cvv?: string;
  };
  role: USER_ROLES;
}
