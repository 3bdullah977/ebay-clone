import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@/services/auth/auth.service';
import { CreateUserDto, LoginDto } from '@ebay-clone/nestjs-libs';
import { LocalAuthGuard } from '@/services/auth/guards/local-auth/local-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/services/auth/guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from '@/services/auth/guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    const res = await this.authService.login(
      req.user.userId,
      req.user.username,
    );
    return res;
  }

  @Post('refresh-token')
  @UseGuards(RefreshAuthGuard)
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.userId, req.user.username);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('testJwt')
  testJwt(): string {
    return 'Test JWT';
  }
}
