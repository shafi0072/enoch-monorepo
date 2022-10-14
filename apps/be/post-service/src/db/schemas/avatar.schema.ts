import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvatarDocument = Avatar & Document;

@Schema()
export class Avatar {
  @Prop()
  _id: string;

  @Prop()
  avatarId: string;

  @Prop()
  avatarURL: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
