import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../../categories/dto/category-response.dto';

export class ProductWithCategoriesDto {
  @ApiProperty({ type: Number, example: 1, description: 'Product id' })
  id: number;

  @ApiProperty({ type: String, example: 'iPhone 15', description: 'Product name' })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Latest smartphone',
    description: 'Product description',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ type: Number, example: 999.99, description: 'Base price' })
  price: number;

  @ApiProperty({ type: Number, example: 10, description: 'Discount percent' })
  discount: number;

  @ApiProperty({ type: Number, example: 899.99, description: 'Computed final price' })
  finalPrice: number;

  @ApiProperty({
    type: String,
    example: 'https://cdn.example.com/p.jpg',
    description: 'Primary image URL',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({ type: Number, example: 4.5, description: 'Average rating' })
  ratingRate: number;

  @ApiProperty({ type: Number, example: 100, description: 'Number of ratings' })
  ratingCount: number;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2025-01-01T00:00:00.000Z',
    description: 'Created at',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2025-01-01T00:00:00.000Z',
    description: 'Last update',
  })
  updatedAt: Date;

  @ApiProperty({
    type: CategoryResponseDto,
    isArray: true,
    description: 'Categories linked to this product',
  })
  categories: CategoryResponseDto[];
}
