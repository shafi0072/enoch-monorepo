import { registerEnumType } from '@nestjs/graphql';

export enum EventEmitSubjects {
  CREATE_ALLOWED_USER = 'create-allowed_user',
}

registerEnumType(EventEmitSubjects, {
  name: 'EventEmitSubjects',
});
