import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';
import { CreateUserDto, PublicUserDto } from '@/user/dto/user.dto';
import { User } from '@/user/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private toPublicUserDto(user: User): PublicUserDto {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<PublicUserDto> {
    try {
      const dbUser = await this.userRepository.create(createUserDto);
      return this.toPublicUserDto(dbUser);
    } catch (err) {
      if (err.code === 11000) {
        throw new Error('Пользователь с таким email уже существует');
      }
      throw new Error('Не удалось создать пользователя');
    }
  }
}
