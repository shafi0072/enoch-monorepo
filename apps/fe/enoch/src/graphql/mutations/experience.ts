import { gql } from "@apollo/client";

export const ADD_USER_EXPERINCE = gql`
  mutation addUserExperince($UserExperience: AddUserJobExperience!) {
    addUserExperince(UserExperience: $UserExperience) {
      userJobExperience {
        jobTitle
      }
    }
  }
`;
