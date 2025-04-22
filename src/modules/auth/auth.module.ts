import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

import { AUTH_REPOSITORY_MONGO } from 'src/shared/tokens';
import { MongoAuthRepo } from 'src/infrastructure/mongo/auth/auth.repository';
import { JwtStrategy } from 'src/infrastructure/shared/auth/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '30d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: AUTH_REPOSITORY_MONGO, useClass: MongoAuthRepo },
  ],
})
export class AuthModule {}
