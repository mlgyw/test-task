import { IsEmail, IsString, Length } from 'class-validator';

export class AuthTokensDto {
  accessToken: string
  refreshToken: string;
}

export class AuthSignUpDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class AuthSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}