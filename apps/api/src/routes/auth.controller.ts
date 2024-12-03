import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@/services/auth/auth.service';
import { CreateUserDto, LoginDto } from '@ebay-clone/nestjs-libs';
import { LocalAuthGuard } from '@/services/auth/guards/local-auth/local-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RefreshAuthGuard } from '@/services/auth/guards/refresh-auth/refresh-auth.guard';
import { Public } from '@/services/auth/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
  }

  @ApiBody({ type: LoginDto })
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    const res = await this.authService.login(
      req.user.userId,
      req.user.username,
      req.user.role,
    );
    return res;
  }

  @ApiBody({ type: class schema {} })
  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh-token')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.userId, req.user.username);
  }

  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req.user.userId);
  }

  @ApiBearerAuth()
  @Get('testJwt')
  testJwt() {
    return { message: 'success' };
  }
}
