import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JwtPayload } from './payload.types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthStrategy } from 'src/core/auth/interfaces/auth-strategy.interface';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy, 'jwt')
  implements AuthStrategy
{
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    return this.authService.validateUser(payload);
  }
}
