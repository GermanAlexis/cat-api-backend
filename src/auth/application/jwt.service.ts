import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../infrastucture/dto/register-auth.dto';
import { envs } from 'src/config/envs';

@Injectable()
export class JwtCustomService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(payload: RegisterDto) {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: envs.jwtSecret,
    });
  }
}
