import { ApiProperty } from '@nestjs/swagger';
import { ResponseRoleDto } from '../../roles/dto/response-role.dto';

export class UserWithRolesDto {
  @ApiProperty({ type: Number, example: 1, description: 'User id' })
  id: number;

  @ApiProperty({ type: String, example: 'Jane Doe', description: 'User display name' })
  name: string;

  @ApiProperty({ type: String, example: 'jane@example.com', description: 'User email' })
  email: string;

  @ApiProperty({
    type: ResponseRoleDto,
    isArray: true,
    description: 'Roles linked to this user',
  })
  roles: ResponseRoleDto[];
}
