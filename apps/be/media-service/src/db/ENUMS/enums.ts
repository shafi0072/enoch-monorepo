import { registerEnumType } from '@nestjs/graphql';

export enum MediaPrivacy {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}

export enum SubscriberStatus {
  SUBSCRIBED = 'Subscribed',
  REPORTED = 'Reported',
  BLOCKED = 'Blocked',
  CANCELLED = 'Cancelled',
  UNSUBSCRIBED = 'Unsubscribed',
}

export enum AvatarCardType {
  SILVER = 'Silver',
  GOLD = 'Gold',
  DIAMOND = 'Diamond',
}

export enum SignUpType {
  GOOGLE = 'Google',
  LOCAL = 'Local',
}

registerEnumType(MediaPrivacy, {
  name: 'MediaPrivacy',
});

registerEnumType(SubscriberStatus, {
  name: 'SubscriberStatus',
});
