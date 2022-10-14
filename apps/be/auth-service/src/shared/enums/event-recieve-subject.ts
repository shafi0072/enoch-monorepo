import { registerEnumType } from '@nestjs/graphql';

export enum EventRecieveSubjects {
  CREATE_ALLOWED_USER = 'create-allowed_user',
  SAVE_OTP = 'save-otp',
}

registerEnumType(EventRecieveSubjects, {
  name: 'EventRecieveSubjects',
});
