import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PostMediasDocument = PostMedias & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class PostMedias {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop()
  CreatorsEmail: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  postId?: string;

  @Prop({ type: [String] })
  filesUrl?: Array<string>;

  @Prop({ type: String })
  fileUrl?: string;

  @Prop({
    type: [
      {
        type: {
          fieldname: String,
          originalname: String,
          encoding: String,
          mimetype: String,
          destination: String,
          filename: String,
          path: String,
          Size: Number,
        },
      },
    ],
  })
  multerObject?: Array<Object>;

  @Prop({
    type: [
      {
        type: {
          fieldname: String,
          originalname: String,
          encoding: String,
          mimetype: String,
          bucket: String,
          key: String,
          size: Number,
          acl: String,
          contentType: String,
          contentDisposition: String,
          contentEncoding: String,
          storageClass: String,
          serverSideEncryption: String,
          metadata: String,
          location: String,
        },
      },
    ],
  })
  multerS3Object?: Array<Object>;
}

export const PostMediaSchema = SchemaFactory.createForClass(PostMedias);
