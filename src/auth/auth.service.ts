import { UserService } from '@/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH_UNKNOWN_ERROR } from '@/auth/auth.constants';
import { AuthSignInDto, AuthSignUpDto, AuthTokensDto } from '@/auth/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(authSignUpDto: AuthSignUpDto): Promise<AuthTokensDto> {
    const user = await this.userService.create(authSignUpDto);
    if (!user) {
      throw new BadRequestException(AUTH_UNKNOWN_ERROR);
    }
    return this.generateTokens(user.email);
  }

  async login(authSignInDto: AuthSignInDto): Promise<AuthTokensDto> {
    const user = await this.userService.validateUser(authSignInDto.email, authSignInDto.password);
    if (!user) {
      throw new BadRequestException(AUTH_UNKNOWN_ERROR);
    }
    return this.generateTokens(user.email);
  }

  async generateTokens(email: string): Promise<AuthTokensDto> {
    const accessToken = this.jwtService.sign({ sub: email });
    const refreshToken = this.jwtService.sign(
      { sub: email },
      {
        expiresIn: '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
