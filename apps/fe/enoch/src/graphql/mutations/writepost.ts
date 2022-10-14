import { gql } from "@apollo/client";

export const POST_DOCUMENT = gql`
  mutation createPost($post: CreatePostInput!) {
    createPost(post: $post) {
      title
      caption
      mediaResources {
        fieldname
        originalname
        encoding
        mimetype
        bucket
        key
        size
        acl
        contentType
        contentDisposition
        contentEncoding
        storageClass
        serverSideEncryption
        metadata
        url: location
      }
    }
  }
`;

export const POST_VIDEO = gql`
  mutation createPost($post: CreatePostInput!) {
    createPost(post: $post) {
      title
      caption
      mediaResources {
        fieldname
        originalname
        encoding
        mimetype
        bucket
        key
        size
        acl
        contentType
        contentDisposition
        contentEncoding
        storageClass
        serverSideEncryption
        metadata
        url: location
      }
    }
  }
`;

export const POST_PHOTO = gql`
  mutation createPost($post: CreatePostInput!) {
    createPost(post: $post) {
      title
      caption
      mediaResources {
        fieldname
        originalname
        encoding
        mimetype
        bucket
        key
        size
        acl
        contentType
        contentDisposition
        contentEncoding
        storageClass
        serverSideEncryption
        metadata
        url: location
      }
    }
  }
`;

export const CREATE_POLL = gql`
  mutation createPost($poll: CreatePostInput!) {
    createPost(post: $poll) {
      title
      type
      optionA
      optionB
      optionC
      optionD
    }
  }
`;

export const TEXT_POST = gql`
  mutation createPost($post: CreatePostInput!) {
    createPost(post: $post) {
      caption
    }
  }
`;

export const ADD_POST_COMMENT = gql`
  mutation addComment($postId: String!, $comment: CreateCommentInput!) {
    addComment(postId: $postId, comment: $comment) {
      _id
      commentCounts
      text
      likeCount
      dislikeCount
      shareCount
      viewsCount
      post
      user {
        _id
        firstName
        lastName
        userId
        username
        avatar
      }
    }
  }
`;

export const ADD_LIKE_ON_COMMENT = gql`
  mutation addLikeOnComment($postId: String!, $commnetId: String!) {
    addLikeOnComment(postId: $postId, commnetId: $commnetId)
  }
`;

export const ADD_VOTE = gql`
  mutation ($selectedOption: String!, $postId: String!) {
    addVote(selectedOption: $selectedOption, postId: $postId) {
      optionA
      optionB
      optionC
      optionD
      optionACount
      optionBCount
      optionCCount
      optionDCount
      optionAPercent
      optionBPercent
      optionCPercent
      optionDPercent
    }
  }
`;

export const ADD_REACTION_ON_POST = gql`
  mutation ($postId: String!, $reactionType: ReactionType!) {
    addReactionOnPost(postId: $postId, reactionType: $reactionType)
  }
`;
