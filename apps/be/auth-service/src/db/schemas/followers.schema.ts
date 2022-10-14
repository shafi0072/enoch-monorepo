import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Followers {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  followee: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  follower: User;

  @Prop({ default: Date.now })
  start: Date;

  @Prop()
  end: Date;
}

export const FollowersSchema = SchemaFactory.createForClass(Followers);
export type FollowersDocument = Followers & Document;
