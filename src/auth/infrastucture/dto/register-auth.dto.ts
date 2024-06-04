import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
