import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
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
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth(BEARER_JWT)
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'List roles',
    description: 'ADMIN only.',
  })
  @ApiOkResponse({ description: 'Role catalog', type: ResponseRoleDto, isArray: true })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  findAll(): Promise<ResponseRoleDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'Get role by id',
    description: 'ADMIN only.',
  })
  @ApiParam({ name: 'id', description: 'Role id', example: 1 })
  @ApiOkResponse({ description: 'Role', type: ResponseRoleDto })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiNotFoundResponse({ description: 'Role not found (404).' })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseRoleDto> {
    return this.rolesService.findOne(id);
  }

  @Post()
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'Create role',
    description: 'ADMIN only. Role name must be unique.',
  })
  @ApiCreatedResponse({ description: 'Created role', type: ResponseRoleDto })
  @ApiBadRequestResponse({ description: OpenApi.Err400 })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  create(@Body() dto: CreateRoleDto): Promise<ResponseRoleDto> {
    return this.rolesService.create(dto);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'Update role',
    description: 'Partial update. ADMIN only.',
  })
  @ApiParam({ name: 'id', description: 'Role id', example: 1 })
  @ApiOkResponse({ description: 'Updated role', type: ResponseRoleDto })
  @ApiBadRequestResponse({ description: OpenApi.Err400 })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiNotFoundResponse({ description: 'Role not found (404).' })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<ResponseRoleDto> {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  @ApiOperation({
    summary: 'Delete role',
    description: 'ADMIN only.',
  })
  @ApiParam({ name: 'id', description: 'Role id', example: 1 })
  @ApiOkResponse({ description: 'Deleted role', type: ResponseRoleDto })
  @ApiForbiddenResponse({ description: OpenApi.Err403.admin })
  @ApiNotFoundResponse({ description: 'Role not found (404).' })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseRoleDto> {
    return this.rolesService.delete(id);
  }
}
