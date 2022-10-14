import { registerEnumType } from '@nestjs/graphql';

export enum AccountType {
  Individual = 'Individual',
  Business = 'Business'
};

registerEnumType(AccountType, {
  name: 'AccountType',
});
