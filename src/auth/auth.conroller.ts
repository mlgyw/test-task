import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@/auth/auth.service';
import {
  AuthSignInDto,
  AuthSignUpDto,
  AuthTokensDto,
} from '@/auth/dto/auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '@/common/interfaces/request.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @ApiBody({
    description: 'User data to create user',
    type: AuthSignUpDto,
  })
  @ApiResponse({
    status: 201,
    type: AuthTokensDto,
  })
  @Post('sign-up')
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<AuthTokensDto> {
    try {
      return await this.authService.register(authSignUpDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Log-in' })
  @ApiBody({
    description: 'User data to get access',
    type: AuthSignInDto,
  })
  @ApiResponse({
    status: 201,
    type: AuthTokensDto,
  })
  @Post('sign-in')
  async signIn(@Body() authSignInDto: AuthSignInDto): Promise<AuthTokensDto> {
    try {
      return await this.authService.login(authSignInDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'More convenient to test it in the browser' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const user = req.user;
    const tokens = await this.authService.authWithGoogle(user.email);
    res.redirect(
      `/auth/tokens?access_token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}`,
    ); // для визуального удобства
    return tokens;
  }

  @ApiOperation({ summary: 'For visual convenience' })
  @Get('tokens')
  showTokens(
    @Query('access_token') accessToken: string,
    @Query('refresh_token') refreshToken: string,
    @Res() res: Response,
  ) {
    res.send(
      `<h1>Access Token: ${accessToken}</h1><h1>Refresh Token: ${refreshToken}</h1>`,
    );
  }
}
