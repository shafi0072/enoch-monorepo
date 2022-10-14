import { MediaPrivacy } from '../ENUMS/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/db/schemas/user.schema';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema()
export class Media {
  @Prop({ require: true })
  title: string;

  @Prop({ require: true })
  category: string;

  @Prop({ require: true })
  thumbnail: string;

  @Prop({ type: [{ type: String, default: [] }] })
  hashtags?: Array<string>;

  @Prop({ default: MediaPrivacy.PUBLIC, enum: MediaPrivacy })
  privacyStatus: MediaPrivacy;

  @Prop()
  pricePerView: number;

  @Prop({ require: true })
  video: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: User;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
