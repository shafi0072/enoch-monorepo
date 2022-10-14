import { gql } from "@apollo/client";

export const FETCH_USERS = gql`
  query getUsers {
    getUsers {
      firstName
    }
  }
`;

export const FETCH_COUNTRY_CODE = gql`
  query getAllCountriesWithCountryCode {
    getAllCountriesWithCountryCode {
      name
      code
      dial_code
    }
  }
`;

export const FETCH_USER_INFO = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      dateOfBirth
      gender
      website
      country
      bio
      relationshipStatus
      hereFor
      hideHereFor
      hideDateOfBirth
      hideRelationshipStatus
      username
      avatarTitle
      userJobExperience {
        jobTitle
        employementType
        company
        location
        isCurrentlyWorking
        industry
        description
        startMonth
        startYear
        endMonth
        endYear
      }
    }
  }
`;

export const FETCH_POSTS_TIMELINE = gql`
  query getUserTimeLine {
    getUserTimeLine(limit: 20) {
      posts {
        _id
        title
        caption
        likeCount
        type
        dislikeCount
        shareCount
        commentCounts
        viewsCount
        sendCount
        createdAt
        optionA
        optionB
        optionC
        optionD
        duration
        user {
          username
          avatar
        }
        mediaResources {
          _id
          contentType
          url: location
        }
      }
    }
  }
`;

export const FETCH_POST_COMMENTS_BY_ID = gql`
  query getCommentsByid($postId: String!, $nextCursor: String, $limit: Float) {
    getCommentsByid(postId: $postId, nextCursor: $nextCursor, limit: $limit) {
      hasMoreComments
      startCursor
      endCursor
      comments {
        _id
        text
        likeCount
        dislikeCount
        shareCount
        commentCounts
        viewsCount
        sendCount
        user {
          _id
          firstName
          lastName
          userId
          username
          avatar
        }
        userData {
          _id
          firstName
          lastName
          userId
          username
          avatar
        }
        repliesCount
        createdAt
      }
    }
  }
`;

export const FETCH_USERS_FROM_MENTION = gql`
  query mentionSearch($mentionQuery: MentionQuery!) {
    mentionSearch(mentionQuery: $mentionQuery) {
      _id
      firstName
      lastName
      avatar
      username
    }
  }
`;

export const FETCH_REPLIES_FOR_COMMENT = gql`
  query getRepliesForComment(
    $postId: String!
    $nextCursor: String
    $limit: Float
    $commentId: String!
  ) {
    getRepliesForComment(
      postId: $postId
      nextCursor: $nextCursor
      limit: $limit
      commentId: $commentId
    ) {
      hasMoreComments
      startCursor
      endCursor
      comments {
        _id
        text
        likeCount
        dislikeCount
        shareCount
        commentCounts
        viewsCount
        sendCount
        user {
          _id
          firstName
          lastName
          userId
          username
          avatar
        }
        userData {
          _id
          firstName
          lastName
          userId
          username
          avatar
        }
        repliesCount
        createdAt
      }
    }
  }
`;
