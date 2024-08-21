import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthTokensDto {
  @ApiProperty({ type: String })
  accessToken: string;
  @ApiProperty({ type: String })
  refreshToken: string;
}

export class AuthSignUpDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;
}

export class AuthSignInDto {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;
}
