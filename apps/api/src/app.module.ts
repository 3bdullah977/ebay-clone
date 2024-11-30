import { Module } from '@nestjs/common';
import { UsersService } from '@ebay-clone/nestjs-libs';
import { AuthController } from './routes/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './services/auth/strategies/local.strategy';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './services/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/auth/strategies/jwt.strategy';
import refreshConfig from './services/auth/config/refresh.config';
import { RefreshStrategy } from './services/auth/strategies/refresh-jwt.strategy';

const providers = [
  UsersService,
  AuthService,
  LocalStrategy,
  JwtStrategy,
  RefreshStrategy,
];
const controllers = [AuthController];

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers,
  providers,
})
export class AppModule {}
