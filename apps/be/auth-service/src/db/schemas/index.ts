import { AllowedUser, AllowedUserSchema } from './allowedUsers.schema';
import { _2FA, _2FASchema } from './_2FA.schema';
import { User, UserSchema } from './user.schema';
import { IndsutrySchema, Industry } from './industry.schema';
import { NewsChannel, NewsChannelSchema } from './newsChannel.schema';
import { Community, CommunitySchema } from './community.schema';
import { Avatar, AvatarSchema } from './avatar.schema';
import { BackgroundImage, BackgroundSchema } from './backgroundImage.schema';
import { Feature, FeatureSchema } from './feature.schema';
import { FollowersSchema, Followers } from './followers.schema';
import { Post, PostSchema } from './post.schema';
import { PostResource, PostResourceSchema } from './postResource.schema';
import {
  CommentResource,
  CommentResourceSchema,
} from './commentResource.schema';
import { Comment, CommentSchema } from './comment.schema';
import { CommentLike, CommentLikeSchema } from './commentLike.schema';
import { PostReaction, PostReactionSchema } from './postReaction.schema';
import { PollPost, PollPostSchema } from './pollPost.schema';
import { PollVote, PollVoteSchema } from './pollVotes';

export const schemas = [
  { name: _2FA.name, schema: _2FASchema },
  { name: User.name, schema: UserSchema },
  { name: AllowedUser.name, schema: AllowedUserSchema },
  { name: Industry.name, schema: IndsutrySchema },
  { name: NewsChannel.name, schema: NewsChannelSchema },
  { name: Community.name, schema: CommunitySchema },
  { name: Avatar.name, schema: AvatarSchema },
  { name: BackgroundImage.name, schema: BackgroundSchema },
  { name: Feature.name, schema: FeatureSchema },
  { name: Followers.name, schema: FollowersSchema },
  { name: Post.name, schema: PostSchema },
  { name: PostResource.name, schema: PostResourceSchema },
  { name: Comment.name, schema: CommentSchema },
  { name: CommentLike.name, schema: CommentLikeSchema },
  { name: CommentResource.name, schema: CommentResourceSchema },
  { name: PostReaction.name, schema: PostReactionSchema },
  { name: PollPost.name, schema: PollPostSchema },
  { name: PollVote.name, schema: PollVoteSchema },
];
