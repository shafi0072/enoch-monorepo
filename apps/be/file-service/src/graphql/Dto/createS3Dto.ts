import { ObjectType, Field, Int, ID, InputType } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';

export class createS3Dto {
  @IsString()
  @IsNotEmpty()
  description: string;

  image?: string;
}

@ObjectType()
export class s3UploadType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly fileUrl: string;
}

@InputType()
export class s3UploadInput {
  @Field()
  readonly file: string;
}
