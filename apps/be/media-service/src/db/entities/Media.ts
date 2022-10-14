import { MediaPrivacy } from '../ENUMS/enums';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './User';
import * as mongoose from 'mongoose';

@Schema()
export class Media {
  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop()
  thumbnail: string;

  @Prop()
  hasttags: string[];

  @Prop({ default: MediaPrivacy.PUBLIC, enum: MediaPrivacy })
  privacyStatus: MediaPrivacy;

  @Prop()
  pricePerView: number;

  @Prop()
  video: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}
