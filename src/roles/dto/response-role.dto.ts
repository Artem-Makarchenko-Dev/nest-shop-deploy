import { ApiProperty } from '@nestjs/swagger';

export class ResponseRoleDto {
  @ApiProperty({ type: Number, example: 1, description: 'Role id' })
  id: number;

  @ApiProperty({ type: String, example: 'ADMIN', description: 'Role name' })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Full system access',
    description: 'Role description',
  })
  description: string;
}
