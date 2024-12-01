import { UsersService, CreateUserDto } from '@ebay-clone/nestjs-libs';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { JwtPayload } from './types/jwt-payload';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async registerUser(dto: CreateUserDto) {
    const foundUser = await this.usersService.findByEmail(dto.email);
    if (foundUser) throw new ConflictException('Email is already used');
    return this.usersService.create(dto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const match = verify(user.passwordHash, password);
    if (!match) throw new UnauthorizedException('Invalid credentials!');

    return { userId: user.userId, username: user.username, role: user.role };
  }

  async login(userId: number, name: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRT = await hash(refreshToken);
    await this.usersService.updateHashedRefreshToken(userId, hashedRT);

    return {
      id: userId,
      name: name,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: JwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    const refreshTokenMatched = await verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid refresh token!');

    const currentUser = { id: user.userId, role: user.role };
    return currentUser;
  }

  async refreshToken(userId: number, name: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRT = await hash(refreshToken);
    await this.usersService.updateHashedRefreshToken(userId, hashedRT);

    return {
      id: userId,
      name: name,
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number) {
    return await this.usersService.updateHashedRefreshToken(userId, 'null');
  }
}
