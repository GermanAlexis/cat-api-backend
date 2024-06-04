import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    name: 'email',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    required: true,
    type: String,
  })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
