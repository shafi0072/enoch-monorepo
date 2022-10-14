import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PollDuration } from 'src/shared/enums/poll-enums';

@ObjectType()
export class PollProps {
  @Field({ nullable: true })
  optionA: string;

  @Field({ nullable: true })
  optionB: string;

  @Field({ nullable: true })
  optionC: string;

  @Field({ nullable: true })
  optionD: string;

  @Field(() => Int, { nullable: true })
  optionACount: number;

  @Field(() => Int, { nullable: true })
  optionBCount: number;

  @Field(() => Int, { nullable: true })
  optionCCount: number;

  @Field(() => Int, { nullable: true })
  optionDCount: number;

  @Field(() => Int, { nullable: true })
  optionAPercent: number;

  @Field(() => Int, { nullable: true })
  optionBPercent: string;

  @Field(() => Int, { nullable: true })
  optionCPercent: string;

  @Field(() => Int, { nullable: true })
  optionDPercent: string;

  @Field({ nullable: false })
  duration: PollDuration;

  @Field({ name: 'isExpired', nullable: false })
  isExpired: boolean;

  @Field()
  totalVoteCount:number
}
