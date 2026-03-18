import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<ResponseRoleDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseRoleDto> {
    return this.rolesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRoleDto): Promise<ResponseRoleDto> {
    return this.rolesService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<ResponseRoleDto> {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseRoleDto> {
    return this.rolesService.delete(id);
  }
}
