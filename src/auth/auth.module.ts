import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './infrastucture/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtCustomService } from './application/jwt.service';
import { envs } from 'src/config/envs';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtCustomService],
})
export class AuthModule {}
