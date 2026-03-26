import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { BEARER_JWT, OpenApi } from '../common/swagger/openapi.constants';
import { USER_ROLES } from '../common/types/roles.types';
import { ResponseRoleDto } from '../roles/dto/response-role.dto';
import { UserWithRolesDto } from './dto/user-with-roles.dto';
import { UserRolesService } from './user-roles.service';

@ApiTags('User Roles')
@ApiBearerAuth(BEARER_JWT)
@Controller('user-roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post(':userId/:roleId')
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'Assign role to user',
    description: 'ADMIN only. Creates a row in the user–role join table.',
  })
  @ApiParam({ name: 'userId', description: 'User id', example: 1 })
  @ApiParam({ name: 'roleId', description: 'Role id', example: 2 })
  @ApiOkResponse({
    description: "User's roles after assignment",
    type: ResponseRoleDto,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiNotFoundResponse({ description: 'User or role not found (404).' })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  assignRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<ResponseRoleDto[]> {
    return this.userRolesService.assignRoleToUser(userId, roleId);
  }

  @Delete(':userId/:roleId')
  @HttpCode(200)
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'Remove role from user',
    description: 'ADMIN only. Deletes the join row.',
  })
  @ApiParam({ name: 'userId', description: 'User id', example: 1 })
  @ApiParam({ name: 'roleId', description: 'Role id', example: 2 })
  @ApiOkResponse({
    description: "User's remaining roles",
    type: ResponseRoleDto,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiNotFoundResponse({ description: 'User, role, or assignment not found (404).' })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  removeRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<ResponseRoleDto[]> {
    return this.userRolesService.removeRoleFromUser(userId, roleId);
  }

  @Get('user/:userId')
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'List roles for user',
    description: 'ADMIN only.',
  })
  @ApiParam({ name: 'userId', description: 'User id', example: 1 })
  @ApiOkResponse({
    description: 'Roles for this user',
    type: ResponseRoleDto,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiNotFoundResponse({ description: 'User not found (404).' })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  getRoles(@Param('userId', ParseIntPipe) userId: number): Promise<ResponseRoleDto[]> {
    return this.userRolesService.getRolesForUser(userId);
  }

  @Get('role/:roleId')
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'List users with role',
    description: 'ADMIN only. Includes nested role metadata.',
  })
  @ApiParam({ name: 'roleId', description: 'Role id', example: 1 })
  @ApiOkResponse({
    description: 'Users that have this role',
    type: UserWithRolesDto,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  getUsers(@Param('roleId', ParseIntPipe) roleId: number): Promise<UserWithRolesDto[]> {
    return this.userRolesService.getUsersWithRole(roleId);
  }
}
