import { registerEnumType } from '@nestjs/graphql';

export enum CommonErrors {
  SomethingWentWrong = 'Something went wrong',
  PollDoesNotExist = 'Poll does not exist',
  AlreadyVoted = 'You have already voted on this poll',
  OptionSelectedDoesNotExist = 'Option you have selected does not exist on this poll',
  pollExpired = 'Poll already expired user cannot vote on expired poll',
  unableToReply = 'Unable to reply on this comment  please try again',
  postReactionConflict = "You can't add the same reaction on this post",
}

registerEnumType(CommonErrors, {
  name: 'CommmonErrors',
});
