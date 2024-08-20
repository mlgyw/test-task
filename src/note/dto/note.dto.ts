import {
  IsString,
  Length,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';

export class СreateNoteDto {
  @IsString()
  @Length(1, 255)
  topic: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  location: string;

  @IsString()
  image: string;
}

export class NoteDto {
  id?: string;
  topic: string;
  description: string;
  tags: string[];
  location: string;
  image: string;
  userID?: Types.ObjectId;
}

export class UpdateNoteDto {
  @IsString()
  @Length(1, 255)
  topic: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  location: string;

  @IsString()
  image: string;
}
