import { AuthResolver } from './auth.resolver';
import { AuthorsResolver } from './authors.resolver';
import { AvatarResolver } from './avatar.resolver';
import { CommentsResolver } from './comment.resolver';
import { CommunityResolver } from './community.resolver';
import { GeneratePasskeyResolver } from './generatePasskey.resolver';
import { IndustryResolver } from './industry.resolver';
import { NewsChannelResolver } from './newsChannel.resolver';
import { OnboardingResolver } from './onBoarding.resolver';
import { PollPropsResolver } from './poll.resolver';
import { PostResolver } from './post.resolver';
import { UsersResolver } from './user.resolver';

const resolvers = [
  AuthorsResolver,
  UsersResolver,
  AuthResolver,
  GeneratePasskeyResolver,
  OnboardingResolver,
  IndustryResolver,
  CommunityResolver,
  NewsChannelResolver,
  AvatarResolver,
  PostResolver,
  PollPropsResolver,
  CommentsResolver,
];

export default resolvers;
