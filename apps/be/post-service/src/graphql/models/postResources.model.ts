import { Field, ObjectType,ID } from '@nestjs/graphql';

@ObjectType()
export class PostResource {

  @Field(type =>ID, {nullable:true})
  _id?: string

  @Field({nullable:true})
  fieldname?: String

  @Field({nullable:true})
  originalname?: String
  
  @Field({nullable:true})
  encoding?: String

  @Field({nullable:true})
  mimetype?: String
  
  @Field({nullable:true})
  bucket?: String
  
  @Field({nullable:true})
  key?: String
  
  @Field({nullable:true})
  size?: number
  
  @Field({nullable:true})
  acl ?: String

  @Field({nullable:true})
  contentType?: String

  @Field({nullable:true})
  contentDisposition?: String

  @Field({nullable:true})
  contentEncoding?: String
 
  @Field({nullable:true})
  storageClass?: String

  @Field({nullable:true})
  serverSideEncryption?: String

  @Field({nullable:true})
  metadata?: String

  @Field({nullable:true})
  location?: String
}