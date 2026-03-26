import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponseDto {
  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Short-lived JWT for Authorization: Bearer',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Long-lived token for obtaining new access tokens',
  })
  refreshToken: string;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    description: 'Authenticated user without password',
    example: {
      id: 1,
      email: 'user@example.com',
      name: 'Jane',
      roles: ['USER'],
    },
  })
  user: Record<string, unknown>;
}

export class LogoutResponseDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Whether logout completed',
  })
  success: boolean;

  @ApiProperty({
    type: String,
    example: 'Successfully logged out',
    description: 'Human-readable status',
  })
  message: string;
}
