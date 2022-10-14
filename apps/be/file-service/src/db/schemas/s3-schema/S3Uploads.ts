import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type S3UploadsDocument = S3Uploads & Document;

@Schema()
export class S3Uploads {
  @Prop()
  fileUrl: string;

  @Prop({ type: [String] })
  filesUrl: Array<string>;
}

export const S3UploadsSchema = SchemaFactory.createForClass(S3Uploads);
