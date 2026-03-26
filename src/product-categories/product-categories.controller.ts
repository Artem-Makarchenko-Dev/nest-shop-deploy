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
import { CategoryResponseDto } from '../categories/dto/category-response.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { BEARER_JWT, OpenApi } from '../common/swagger/openapi.constants';
import { USER_ROLES } from '../common/types/roles.types';
import { ProductWithCategoriesDto } from './dto/product-with-categories.dto';
import { ProductCategoriesService } from './product-categories.service';

@ApiTags('Product Categories')
@ApiBearerAuth(BEARER_JWT)
@Controller('product-categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Post(':productId/:categoryId')
  @Roles(USER_ROLES.ADMIN, USER_ROLES.MANAGER)
  @ApiOperation({
    summary: 'Link product to category',
    description: 'ADMIN or MANAGER only. Inserts into the join table.',
  })
  @ApiParam({ name: 'productId', description: 'Product id', example: 1 })
  @ApiParam({ name: 'categoryId', description: 'Category id', example: 2 })
  @ApiOkResponse({
    description: 'All categories linked to this product after the operation',
    type: CategoryResponseDto,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: OpenApi.Err403.adminOrManager })
  @ApiNotFoundResponse({ description: 'Product or category not found (404).' })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  assignCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<CategoryResponseDto[]> {
    return this.productCategoriesService.assignCategoryToProduct(productId, categoryId);
  }

  @Delete(':productId/:categoryId')
  @HttpCode(200)
  @Roles(USER_ROLES.ADMIN, USER_ROLES.MANAGER)
  @ApiOperation({
    summary: 'Unlink product from category',
    description: 'ADMIN or MANAGER only. Removes the join row.',
  })
  @ApiParam({ name: 'productId', description: 'Product id', example: 1 })
  @ApiParam({ name: 'categoryId', description: 'Category id', example: 2 })
  @ApiOkResponse({
    description: 'Remaining categories for this product',
    type: CategoryResponseDto,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: OpenApi.Err403.adminOrManager })
  @ApiNotFoundResponse({ description: 'Product, category, or link not found (404).' })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  removeCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<CategoryResponseDto[]> {
    return this.productCategoriesService.removeCategoryFromProduct(productId, categoryId);
  }

  @Public()
  @Get('product/:productId')
  @ApiOperation({
    summary: 'List categories for product',
    description: 'Public.',
    security: [],
  })
  @ApiParam({ name: 'productId', description: 'Product id', example: 1 })
  @ApiOkResponse({
    description: 'Categories linked to the product',
    type: CategoryResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Product not found (404).' })
  getCategoriesForProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<CategoryResponseDto[]> {
    return this.productCategoriesService.getCategoriesForProduct(productId);
  }

  @Public()
  @Get('category/:categoryId')
  @ApiOperation({
    summary: 'List products in category',
    description: 'Public.',
    security: [],
  })
  @ApiParam({ name: 'categoryId', description: 'Category id', example: 1 })
  @ApiOkResponse({
    description: 'Products with nested categories',
    type: ProductWithCategoriesDto,
    isArray: true,
  })
  getProductsForCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<ProductWithCategoriesDto[]> {
    return this.productCategoriesService.getProductsForCategory(categoryId);
  }
}
