import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note {
  @Prop({
    type: String,
    default: function () {
      return this._id.toString();
    },
    select: false,
  })
  id: string;

  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String] })
  tags: string[];

  createdAt: string;

  @Prop({ required: true })
  location: string;

  @Prop({})
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userID: Types.ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
