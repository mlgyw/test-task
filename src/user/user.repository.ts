import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/user/schemas/user.schema';
import { CreateUserDto } from '@/user/dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (err) {
      throw err;
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      notes: user.notes,
    };
  }

  async addNoteToUser(userID: string, noteID: string): Promise<void> {
    return this.userModel.findByIdAndUpdate(
      userID,
      { $push: { notes: noteID } },
      { new: true },
    );
  }
}
