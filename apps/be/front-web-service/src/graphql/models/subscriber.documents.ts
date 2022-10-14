import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { SubscriberModel } from './subscriber.model';

@ObjectType()
export class SubscriberDocument {
  @Field(type => [SubscriberModel], { nullable: true })
  Subscribers?: SubscriberModel[];

  @Field({ nullable: true })
  hasMoreComments: boolean;

  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: true })
  startCursor: string;

  @Field()
  startId: string;

  @Field()
  endId: string;
}
