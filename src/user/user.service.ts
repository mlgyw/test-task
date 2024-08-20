import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';
import { CreateUserDto, PublicUserDto, UserDto } from '@/user/dto/user.dto';
import { User } from '@/user/schemas/user.schema';
import { genSalt, hash, compare } from 'bcryptjs';
import {
  USER_ALREADY_EXIST_ERROR,
  USER_CANNOT_CREATE_ERROR,
  USER_WRONG_EMAIL_ERROR,
  USER_WRONG_PASSWORD_ERROR,
} from '@/user/user.costants';

@Injectable()
export class UserService {
  saltRounds: number = 10;
  constructor(private readonly userRepository: UserRepository) {}

  private toPublicUserDto(user: User): PublicUserDto {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    return await hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<PublicUserDto> {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = { ...createUserDto, password: hashedPassword };

      const dbUser = await this.userRepository.create(user);

      return this.toPublicUserDto(dbUser);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException(USER_ALREADY_EXIST_ERROR);
      }
      throw new BadRequestException(USER_CANNOT_CREATE_ERROR);
    }
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    return this.userRepository.findUserByEmail(email);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(USER_WRONG_EMAIL_ERROR);
    }
    const isCorrectPass: boolean = await compare(password, user.password);
    if (!isCorrectPass) {
      throw new UnauthorizedException(USER_WRONG_PASSWORD_ERROR);
    }
    return { email: user.email };
  }

  async addNoteToUser(userID: string, noteID: string): Promise<void> {
    return await this.userRepository.addNoteToUser(userID, noteID);
  }
}
