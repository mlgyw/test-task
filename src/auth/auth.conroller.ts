import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import {
  AuthSignInDto,
  AuthSignUpDto,
  AuthTokensDto,
} from '@/auth/dto/auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
