import { CommentsResolver } from './comment.resolver';
import { PollPropsResolver } from './poll.resolver';
import { PostResolver } from './post.resolver';

const resolvers = [
  PostResolver,
  PollPropsResolver,
  CommentsResolver,
];

export default resolvers;
