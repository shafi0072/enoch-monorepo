import { Contact, ContactSchema } from './contact.schema'
import { Subscriber, SubscriberSchema } from './subscriber.schema'
import { Jtenoch, JtenochSchema } from './jtenoch.schema'
export const schemas = [
  { name: Contact.name, schema: ContactSchema },
  { name: Subscriber.name, schema: SubscriberSchema },
  { name: Jtenoch.name, schema: JtenochSchema },
];
