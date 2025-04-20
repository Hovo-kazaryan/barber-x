import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStrategy } from 'src/core/auth/interfaces/auth-strategy.interface';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtPayload } from './payload.types';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
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
