import { AuthService } from './auth.service';
import UserService from './user.service';
import { _2FAService } from './_2FA.service';
import { OTPService } from './otp-generate.service';
import FollwerService from './follwers.service';
import PostResourceService from './post-reasource.service';
import PostService from './post.service';
import PollPostService from './pollPost.service';
import PollVotesService from './poll-votes.service';
import PostElasticSearchService from './post-elasticseach.service';
import CommentService from './comment.service';
import PostReactionService from './post-reaction.service';
import RedisService from './redis.service';
import CommentLikeService from './commetLIke.service';

export const services = [
  UserService,
  AuthService,
  _2FAService,
  OTPService,
  FollwerService,
  PostService,
  RedisService,
  PostResourceService,
  PollPostService,
  PollVotesService,
  PostElasticSearchService,
  CommentService,
  PostReactionService,
  CommentLikeService,
];
