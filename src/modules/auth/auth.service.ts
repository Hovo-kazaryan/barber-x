import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/infrastructure/auth/strategies/payload.types';

@Injectable()
export class AuthService {
  validateUser(payload: JwtPayload) {
    return true;
  }
}
