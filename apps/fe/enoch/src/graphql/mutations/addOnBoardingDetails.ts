import { gql } from "@apollo/client";

export const ADD_ONBOARDING_DETAILS = gql`
  mutation addOnboardingDetails($onboardingInput: OnboardingInput!) {
    addOnboardingDetails(onboardingInput: $onboardingInput) {
      firstName
      lastName
      dateOfBirth
      hideDateOfBirth
      gender
      website
      country
      bio
      relationshipStatus
      hereFor
      accountType
      selectedInterests
      interests {
        _id
        industryCategory
      }
      communities {
        _id
        communityName
      }
      newsChannels {
        _id
        channelName
      }
      hideHereFor
      hideRelationshipStatus
      hideDateOfBirth
      hideCountry
      hideGender
      username
      avatarTitle
      cardType
      backgroundImage
      avatar
      isOnboardingCompleted
    }
  }
`;

export const CREATE_INDUSTRY = gql`
  mutation createIndusrty($industry: CreateIndustryInput!) {
    createIndustry(industry: $industry) {
      _id
      industryCategory
      isVerified
    }
  }
`;

export const GET_VERIFIED_INDUSTRUES = gql`
  query getVerifiedIndustries {
    getVerifiedIndustries {
      industries {
        industryCategory
        isSelected
        _id
      }
      selectedIndustries
    }
  }
`;

export const GET_SUGGESTED_USERS = gql`
  query getSuggestedUsers {
    getSuggestedUsers {
      _id
      bio
      country
      isFollowing
      username
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation addTofollowers($id: String!) {
    addTofollowers(id: $id) {
      _id
      message
    }
  }
`;

export const FETCH_SUGGESTED_COMMUNITIES = gql`
  query {
    getSuggestedCommunities {
      communities {
        _id
        communityName
        followersCount
        isJoined
      }
      joinedCommunitesArray
    }
  }
`;

export const FETCH_ALL_NEWSLETTERS = gql`
  query getSuggestedNewsLetters {
    getsuggestedNewsChannel {
      newsChannels {
        _id
        channelName
        channelDescription
        isSubscribed
      }
      subscribedChannels
    }
  }
`;

export const UNFOLLLOW_USER = gql`
  mutation unfollowUser($id: String!) {
    unfollowUser(id: $id)
  }
`;
export const CREATE_USERNAME = gql`
  mutation validateuser($username: String!) {
    validateUsername(username: $username)
  }
`;
