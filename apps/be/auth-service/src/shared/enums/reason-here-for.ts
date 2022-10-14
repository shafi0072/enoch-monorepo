import { registerEnumType } from '@nestjs/graphql';

export enum ReasonHereFor {
  SELLING_DIGITAL_ARTS = 'Selling Digital Arts',
  MAKING_SOCIAL_CIRCLE = 'Making Social Circle',
  INVESTING_IN_MARKETPLACE = 'Investing in Marketplace',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

registerEnumType(ReasonHereFor, {
  name: 'ReasonHereFor',
});
