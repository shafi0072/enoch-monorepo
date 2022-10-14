import { createUnionType, Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class setUpGoogle2FA {
  @Field({ nullable: true })
  readonly getqrcode?: string;

  @Field({ nullable: true })
  readonly tempSecret?: string;

  @Field({ nullable: true })
  readonly message?: string;

  @Field({ nullable: true })
  local2FAResponse?: string;

  @Field({ nullable: true })
  methodSelectedtype?: string;
}
