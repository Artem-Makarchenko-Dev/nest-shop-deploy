import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'user@example.com',
    description: 'Registered user email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'secret12',
    minLength: 6,
    description: 'Account password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
