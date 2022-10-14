import { registerEnumType } from '@nestjs/graphql';
export enum DeleteItem {
  SUCCESS_MESSAGE = 'Item deleted successfully.',
  FAILURE_MESSAGE = 'Failed to delete item, please try again',
}

registerEnumType(DeleteItem, {
  name: 'DeleteItem',
});
