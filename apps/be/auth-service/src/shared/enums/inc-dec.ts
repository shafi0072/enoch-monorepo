import { registerEnumType } from '@nestjs/graphql';
export enum IncDecValue {
  ONE = 1,
  MINUS_ONE = -1,
}

registerEnumType(IncDecValue, {
  name: 'IncDecValue',
});
