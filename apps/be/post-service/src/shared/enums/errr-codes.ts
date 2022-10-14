import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCodes {
  MONGOOSE_UNIQUE_VALUE_CONFLICT_ERROR_CODE = 11000,
}

registerEnumType(ErrorCodes, {
  name: 'ErrorCodes',
});
