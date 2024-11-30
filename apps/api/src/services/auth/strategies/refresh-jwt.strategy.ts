import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import type { JwtPayload } from '../types/jwt-payload';
import refreshConfig from '../config/refresh.config';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: refreshJwtConfiguration.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload) {
    const userId = payload.sub;
    return this.authService.validateJwtUser(userId);
  }
}
