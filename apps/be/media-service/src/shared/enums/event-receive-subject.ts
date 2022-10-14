import { registerEnumType } from '@nestjs/graphql';

export enum EventRecieveSubjects {
  CREATE_USER = 'create-user',
}

registerEnumType(EventRecieveSubjects, {
  name: 'EventRecieveSubjects',
});
