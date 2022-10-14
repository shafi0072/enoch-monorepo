import { Field, InputType } from '@nestjs/graphql';
import { AccountType } from 'src/shared/enums/account-type';

@InputType()
export class SetAccountTypeInput {
  @Field((type) => AccountType, { nullable: false })
  accountType?: string;
}
