import { USER_ROLES } from 'src/shared/constants';

export interface JwtPayload {
  sub: string; // _id
  email: string;
  role: USER_ROLES;
}

export interface LoginPayload {
  email: string;
  password: string;
  role: USER_ROLES;
}
