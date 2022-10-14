import { User, UserSchema } from './user.schema';
import { Media, MediaSchema } from './media.schema';
import { Subscriber, SubscriberSchema } from './subscriber.schema';
import { Subscription, SubscriptionSchema } from './subscription.schema';

export const schemas = [
  { name: User.name, schema: UserSchema },
  { name: Media.name, schema: MediaSchema },
  { name: Subscriber.name, schema: SubscriberSchema },
  { name: Subscription.name, schema: SubscriptionSchema },
];
