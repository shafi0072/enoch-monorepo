import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import moment from 'moment';
import { PollProps } from '../models/poll.model';

@Resolver(() => PollProps)
export class PollPropsResolver {
  @ResolveField('isExpired', returns => Boolean)
  async isExpired(@Parent() poll: PollProps) {
    return (await moment().isBefore(poll?.duration)) ? false : true;
  }
}
