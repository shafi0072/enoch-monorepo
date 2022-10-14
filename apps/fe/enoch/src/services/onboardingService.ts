import {
  GOOGLE_LOGIN_MUTATION,
  RESEND_VERIFY_EMAIL,
  VERIFY_ACCESS_TOKEN,
} from "./../graphql/mutations/verifyAccessToken";
import jwtDecode from "jwt-decode";
import {
  FORGOT_PASSWORD_MUTATION,
  SIGNIN_MUTATION,
} from "./../graphql/mutations/index";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import {
  LoginUserInterface,
  OnBoardingDto,
  RegisterUserInterface,
} from "../interfaces/auth-interface";
import AuthClient, { serverSideClient } from "./AuthClient";
import ToastService from "./ToastService";
import { messages } from "../locals/en-US";
import { ACCESS_TOKEN, USER } from "../constants";
import { routes } from "../constants/routes";
import {
  REQUEST_OTP_FOR_LOCAL_LOGIN,
  RESEND_OTP_FOR_SIGNIN,
} from "../graphql/mutations/requestOTP";
import {
  ADD_ONBOARDING_DETAILS,
  CREATE_INDUSTRY,
  CREATE_USERNAME,
  FETCH_ALL_NEWSLETTERS,
  FETCH_SUGGESTED_COMMUNITIES,
  FOLLOW_USER,
  GET_SUGGESTED_USERS,
  GET_VERIFIED_INDUSTRUES,
  UNFOLLLOW_USER,
} from "../graphql/mutations/addOnBoardingDetails";
import { OnBoardingScreen } from "../constants/onboarding-enums";

class OnboardingService {
  async addOnboardingInformation(
    onboardingData: OnBoardingDto,
    query: any = null
  ) {
    try {
      const response = await AuthClient.mutation(ADD_ONBOARDING_DETAILS, {
        onboardingInput: {
          ...onboardingData,
        },
      });
      await AuthClient.refetch(query);
      if (response?.data) return response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async createIndustry(industryCategory: string) {
    try {
      const response = await AuthClient.mutation(CREATE_INDUSTRY, {
        industry: {
          industryCategory,
        },
      });
      if (response?.data) return response?.data;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async getVerifiedIndustries() {
    try {
      const response = await AuthClient.query(GET_VERIFIED_INDUSTRUES);
      if (response) return await response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async fetchAllCommunities() {
    try {
      const response = await AuthClient.query(FETCH_SUGGESTED_COMMUNITIES);
      console.log("respnose", response);
      if (response) return await response;
    } catch (err: any) {
      console.log("catch", err);
      ToastService.error(err.message);
    }
  }
  async getSuggestedUsers() {
    try {
      const response = await AuthClient.query(GET_SUGGESTED_USERS, {
        fetchPolicy: "network-only",
      });
      if (response) return await response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async getSuggestedNewsLetters() {
    try {
      const response = await AuthClient.query(FETCH_ALL_NEWSLETTERS);
      if (response) return await response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async followUser(id: string) {
    try {
      const response = await AuthClient.mutation(FOLLOW_USER, {
        id,
      });
      if (response) return await response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async unfollowUser(id: string) {
    try {
      const response = await AuthClient.mutation(UNFOLLLOW_USER, {
        id,
      });
      if (response) return await response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async validateUsername(username: string) {
    try {
      const response = await AuthClient.mutation(CREATE_USERNAME, {
        username,
      });
      if (response) return await response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }
}

export default new OnboardingService();
