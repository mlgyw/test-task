import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    default: function () {
      return this._id.toString();
    },
    select: false,
  })
  id: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Note' }] })
  notes: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
