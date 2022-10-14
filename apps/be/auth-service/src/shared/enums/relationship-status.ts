import { registerEnumType } from '@nestjs/graphql';

export enum RelationshipStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  WIDOWED = 'Widowed',
  DIVORCED = 'Divorced',
  DOMESTIC = 'Domestic Partnership',
  PREFER_NOT_TO_SAY = 'Prefer not to say ',
}

registerEnumType(RelationshipStatus, {
  name: 'RelationshipStatus',
});
