import { registerEnumType } from '@nestjs/graphql';

export enum _2FAauthenticationType {
  GOOGLE_AUTHENTICATOR = 'Google',
  LOCAL = 'Local',
}

export enum SignUpType {
  GOOGLE = 'Google',
  LOCAL = 'Local',
}

export enum ResourceType {
  IMAGE = 'Image',
  VIDEO = 'Video',
  DOCUMENT = 'DOCUMENT',
}

export enum PostStatus {
  PUBLISHED = 'Published',
  DRAFTED = 'Drafted',
}

export enum PostType {
  TEXT = 'Text',
  IMAGE = 'Image',
  VIDEO = 'Video',
  AUDIO = 'Audio',
  EVENT = 'Event',
  DOCUMENT = 'DOCUMENT',
  Poll = 'Poll',
  WHITE_ARTICLE = 'WhiteArticle',
  CELEBRATION = 'CELEBRATION',
}

export enum ShareType {
  PERSONAL = 'Personal',
  COMPANY = 'Company',
  PAGE = 'Page',
}

export enum PostVisibility {
  PUBLIC = 'Public',
  CONNECTION_ONLY = 'Connection Only',
  GROUP_MEMBERS_ONLY = 'Group Members Only',
}

export enum ReactionType {
  HEART = 'Heart',
  LIKE = 'Like',
  DISLIKE = 'Dislike',
  CARE = 'Care',
  CLAP = 'Clap',
  IDEA = 'Idea',
  AMAZE = 'Amaze',
}

export enum AvatarCardType {
  SILVER = 'Silver',
  GOLD = 'Gold',
  DIAMOND = 'Diamond',
}

registerEnumType(SignUpType, {
  name: 'SignUpType',
});

registerEnumType(_2FAauthenticationType, {
  name: '_2FAauthenticationType',
});

registerEnumType(ResourceType, {
  name: 'ResourceType',
});

registerEnumType(PostStatus, {
  name: 'PostStatus',
});

registerEnumType(PostType, {
  name: 'PostType',
});
registerEnumType(ShareType, {
  name: 'ShareType',
});
registerEnumType(PostVisibility, {
  name: 'PostVisibility',
});
registerEnumType(ReactionType, {
  name: 'ReactionType',
});
registerEnumType(AvatarCardType, {
  name: 'AvatarCardType',
});
