import {
  MongooseModuleOptions,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
  @Prop()
  _id: string;

  @Prop()
  communityId: string;

  @Prop()
  communityName: string;

  @Prop()
  communityDescription: string;

  @Prop({default: '0K'})
  followersCount: string;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
