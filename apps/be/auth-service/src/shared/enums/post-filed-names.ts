import { registerEnumType } from '@nestjs/graphql';
export enum PostFiledNames {
  LIKE_COUNT = 'likeCount',
  CLAP_COUNT = 'clapCount',
  HEART_COUNT = 'heartCount',
  IDEA_COUNT = 'ideaCount',
  DISLIKE_COUNT = 'dislikeCount',
  AMAZE_COUNT = 'amazeCount',
  COMMENT_COUNT = 'commentCount',
  CARE_COUNT = 'careCount',
}

registerEnumType(PostFiledNames, {
  name: 'PostFiledNames',
});
