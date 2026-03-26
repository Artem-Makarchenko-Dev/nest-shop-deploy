import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BEARER_JWT } from './openapi.constants';

export function setupSwagger(app: INestApplication): void {
  const swaggerEnabled =
    process.env.SWAGGER_ENABLED === 'true' ||
    process.env.NODE_ENV !== 'production';

  if (!swaggerEnabled) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('Shop Kit API')
    .setDescription('E-commerce backend API')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local development')
    .addServer(
      'https://shop-kit-api-production.up.railway.app',
      'Production',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Use: Bearer <accessToken> obtained from POST /auth/login',
      },
      BEARER_JWT,
    )
    .addTag('Auth', 'Authentication and tokens')
    .addTag('Users', 'User accounts and profiles')
    .addTag('Roles', 'Role catalog (ADMIN only)')
    .addTag('User Roles', 'Assign roles to users (ADMIN only)')
    .addTag('Products', 'Product catalog')
    .addTag('Categories', 'Product categories')
    .addTag('Product Categories', 'Link products to categories')
    .addTag('Health', 'Service health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
