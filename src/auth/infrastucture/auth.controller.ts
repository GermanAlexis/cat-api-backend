import { Controller, Get, Post, Body, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { Request } from 'express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    description: 'Login auth',
    type: LoginDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'login success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'verify credential',
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBody({
    description: 'Register auth',
    type: RegisterDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'verify information',
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('verify')
  verifyToken(@Req() req: Request) {
    const token = req['token'];
    return this.authService.verifyToken(token);
  }
}
