import { registerEnumType } from '@nestjs/graphql';
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHERS = 'Others',
}

registerEnumType(Gender, {
  name: 'Gender',
});
