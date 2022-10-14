import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class ResourcesMetaData {
  @Field((type) => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  fieldname: string;

  @Field({ nullable: true })
  originalname: string;

  @Field({ nullable: true })
  encoding: string;

  @Field({ nullable: true })
  mimetype: string;

  @Field({ nullable: true })
  bucket: string;

  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  size: number;

  @Field({ nullable: true })
  acl: string;

  @Field({ nullable: true })
  contentType: string;

  @Field({ nullable: true })
  contentDisposition: string;

  @Field({ nullable: true })
  contentEncoding: string;

  @Field({ nullable: true })
  storageClass: string;

  @Field({ nullable: true })
  serverSideEncryption: string;

  @Field({ nullable: true })
  metadata: string;

  @Field({ nullable: true })
  location: string;
}
