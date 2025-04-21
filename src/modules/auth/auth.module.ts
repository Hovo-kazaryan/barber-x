import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from 'src/infrastructure/shared/auth/strategies/jwt.strategy';
import { AUTH_REPOSITORY_MONGO } from 'src/shared/tokens';
import { MongoAuthRepo } from 'src/infrastructure/mongo/auth/auth.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
