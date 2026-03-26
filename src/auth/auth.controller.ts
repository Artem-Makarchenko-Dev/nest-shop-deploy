import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginResponseDto, LogoutResponseDto } from './dto/auth-login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import type { JwtRequest } from './types/jwt.type';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BEARER_JWT, OpenApi } from '../common/swagger/openapi.constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiOperation({
    summary: 'Login',
    description: 'Exchange email and password for access and refresh tokens. Public.',
    security: [],
  })
  @ApiOkResponse({ description: 'Tokens and user payload', type: AuthLoginResponseDto })
  @ApiBadRequestResponse({ description: OpenApi.Err400 })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials or inactive account (401).' })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @Public()
  @Post('/refresh-token')
  @ApiOperation({
    summary: 'Refresh tokens',
    description: 'Issue a new token pair using a refresh token. Public.',
    security: [],
  })
  @ApiOkResponse({ description: 'New token pair', type: AuthLoginResponseDto })
  @ApiBadRequestResponse({ description: OpenApi.Err400 })
  @ApiUnauthorizedResponse({ description: 'Invalid, expired, or revoked refresh token (401).' })
  async refresh(@Body() dto: RefreshTokenDto) {
    const user = await this.authService.verifyRefreshToken(dto.refreshToken);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @ApiBearerAuth(BEARER_JWT)
  @ApiOperation({
    summary: 'Logout',
    description: 'Invalidate the stored refresh token. Requires Bearer access token.',
  })
  @ApiOkResponse({ description: 'Refresh token cleared', type: LogoutResponseDto })
  @ApiUnauthorizedResponse({ description: OpenApi.Err401 })
  async logout(@Request() req: JwtRequest) {
    return this.authService.logout(req.user.id);
  }
}
