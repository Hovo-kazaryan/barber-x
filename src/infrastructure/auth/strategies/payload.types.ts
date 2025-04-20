import { USER_ROLES } from 'src/shared/constants';

export interface JwtPayload {
  sub: string;
  email: string;
  role: USER_ROLES;
}
