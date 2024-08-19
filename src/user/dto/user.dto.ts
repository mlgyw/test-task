import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class PublicUserDto {
  id: string;
  name: string;
  email: string;
}

export class UserDto {
  id: string
  name: string;
  email: string;
  password: string;
}