import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { LoginDto } from '../infrastucture/dto/login-auth.dto';
import { RegisterDto } from '../infrastucture/dto/register-auth.dto';
import { JwtCustomService } from './jwt.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtCustomService: JwtCustomService,
    // private readonly userService: UserService, TODO? MAke service
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findUserByEmail(email);
    if (!user)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'user not found',
      });

    const isMatch = await this.compareHash(password, user.password);

    if (!isMatch)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Verify Credentials',
      });

    delete user.password;
    const token = await this.jwtCustomService.signIn(user);
    return { user, token };
  }

  async register(registerDto: RegisterDto) {
    const { email, name } = registerDto;
    const user = await this.findUserByEmail(email);
    if (user)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'user not found',
      });

    const passHashed = await this.hashPass(registerDto.password);
    const newUser = { password: '123' }; // TODO? Connect with user service create()
    delete newUser.password;
    return { newUser, passHashed, name };
  }

  private async findUserByEmail(email: string) {
    return { email, password: '123', name: 'German' };
  }

  async verifyToken(token: string) {
    const { iat, exp, ...user } =
      await this.jwtCustomService.verifyToken(token);
    const newToken = await this.jwtCustomService.signIn(user);
    return { user, token: newToken, iat, exp };
  }

  private async hashPass(pass: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(pass, saltOrRounds);
  }

  private async compareHash(
    passwordWithoutHash: string,
    pass: string,
  ): Promise<boolean> {
    return bcrypt.compare(passwordWithoutHash, pass);
  }
}
