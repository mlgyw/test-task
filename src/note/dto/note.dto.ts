import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class СreateNoteDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(1, 255)
  topic: string;

  @ApiProperty({ type: String })
  @IsString()
  description: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ type: String })
  @IsString()
  location: string;

  @ApiProperty({ type: String })
  @IsString()
  image: string;
}

export class NoteDto {
  @ApiProperty({ type: String })
  id?: string;
  @ApiProperty({ type: String })
  topic: string;
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: [String] })
  tags: string[];
  @ApiProperty({ type: String })
  location: string;
  @ApiProperty({ type: String })
  image: string;
  @ApiProperty({ type: String })
  userID?: Types.ObjectId;
}

export class UpdateNoteDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(1, 255)
  topic: string;

  @ApiProperty({ type: String })
  @IsString()
  description: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ type: String })
  @IsString()
  location: string;

  @ApiProperty({ type: String })
  @IsString()
  image: string;
}
