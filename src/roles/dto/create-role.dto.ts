import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    example: 'MANAGER',
    description: 'Unique role name (uppercase recommended)',
    minLength: 3,
    maxLength: 64,
  })
  @IsString()
  @Length(3, 64)
  name: string;

  @ApiProperty({
    type: String,
    example: 'Can manage catalog and orders',
    description: 'What this role is allowed to do',
    maxLength: 200,
  })
  @IsString()
  @MaxLength(200)
  description: string;
}
