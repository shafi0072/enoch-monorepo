import {
  GOOGLE_LOGIN_MUTATION,
  RESEND_VERIFY_EMAIL,
  VERIFY_ACCESS_TOKEN,
} from "./../graphql/mutations/verifyAccessToken";
import jwtDecode from "jwt-decode";
import {
  FORGOT_PASSWORD_MUTATION,
  IS_EMAIL_VERIFIED,
  SIGNIN_MUTATION,
} from "./../graphql/mutations/index";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import {
  LoginUserInterface,
  RegisterUserInterface,
} from "../interfaces/auth-interface";
import AuthClient from "./AuthClient";
import ToastService from "./ToastService";
import { messages } from "../locals/en-US";
import { FETCH_COUNTRY_CODE, FETCH_USER_INFO } from "../graphql/queries";
import { ACCESS_TOKEN, USER } from "../constants";
import { routes } from "../constants/routes";
import {
  REQUEST_OTP_FOR_LOCAL_LOGIN,
  RESEND_OTP_FOR_SIGNIN,
} from "../graphql/mutations/requestOTP";
import { AnySchema } from "yup";
import { OnBoardingScreen } from "../constants/onboarding-enums";
import { onBoardingIntroData } from "../components/app/OnboardingComponents/OnBoardingComponent/OnBoardingIntroduction/onBoardingIntroData";
import { ADD_USER_EXPERINCE } from "../graphql/mutations/experience";

class AuthService {
  async getCountryCodes() {
    let response = null;
    try {
      const { data } = await AuthClient.query(FETCH_COUNTRY_CODE);
      response = data.getAllCountriesWithCountryCode;
    } catch (err: any) {
      ToastService.error(err.message);
    }
    return response;
  }

  async onSignUp({ CreateUserInput, passkey }: RegisterUserInterface) {
    try {
      const response = await AuthClient.mutation(SIGNUP_MUTATION, {
        CreateUserInput,
        passkey,
      });
      const {
        data: {
          signUp: { accessToken, ...user },
        },
      } = response;
      this.saveUser(accessToken, user);
      return response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  saveUserToken(accesToken: any) {
    localStorage.setItem(ACCESS_TOKEN, accesToken);
  }
  saveUser(accesToken: string, user: any) {
    this.saveUserToken(accesToken);
    this.saveUserItem(user);
  }

  saveUserItem(user: any) {
    localStorage.setItem(USER, JSON.stringify(user));
  }
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getUser() {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : {};
  }

  updateUser(newUser: any) {
    const user = this.getUser();
    this.saveUserItem({ ...user, ...newUser });
  }
  async onSignIn({ email, password, passkey }: LoginUserInterface) {
    let response = null;

    try {
      response = await AuthClient.mutation(SIGNIN_MUTATION, {
        email,
        password,
        passkey,
      });
      if (response?.data) {
        const { accessToken } = response.data?.signIn;
        if (!!accessToken) {
          const userAuthDetails: any = jwtDecode(accessToken);
          window.localStorage.setItem(ACCESS_TOKEN, accessToken);
          response = { accessToken, ...userAuthDetails };
          ToastService.success(messages.loginSuccess);
        }
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
    return response;
  }
  async onVerifyAccessToken(token: string) {
    try {
      const response = await AuthClient.mutation(VERIFY_ACCESS_TOKEN, {
        token,
      });
      ToastService.success(messages.emailVerified);
      if (response?.data) {
        const { firstName, lastName, accessToken } =
          response.data?.verifyUserEmail;
        if (!!accessToken) {
          if (window.localStorage.getItem(ACCESS_TOKEN)) {
            window.localStorage.setItem(ACCESS_TOKEN, accessToken);
          }
          return { firstName, lastName, accessToken };
        }
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async resendVerifyEmail() {
    try {
      await AuthClient.mutation(RESEND_VERIFY_EMAIL, {});
      ToastService.success("Email resent successfully!");
    } catch (error: any) {
      ToastService.error(error.message);
    }
  }

  loggedIn() {
    return this.getAccessToken();
  }

  decodeToken(token: string | null) {
    if (token) {
      return jwtDecode(token);
    }
  }

  getCurrentRoute() {
    const token = this.getAccessToken();
    if (!token) {
      return routes.login;
    }

    const decoded: any = this.decodeToken(token);

    if (!decoded.isEmailVerified) {
      return routes.verifyYourEmail;
    }

    if (!decoded.is2FAEnabled) {
      return routes.chooseAuthMethod;
    }

    if (decoded.is2FAEnabled && !decoded.is2FAVerified) {
      return routes.enterOTP;
    }
    return routes.onboarding;
  }

  async getCurrentOnboardingScreen(user: any) {
    if (user.isOnboardingCompleted === true) {
      return routes.home;
    }

    if (user.activeOnBoardingScreen === OnBoardingScreen.ChooseAccountType) {
      return routes.personalInformation;
    }

    if (
      user.activeOnBoardingScreen === OnBoardingScreen.FillPersonalInformation
    ) {
      return routes.personalInformation;
    }

    if (
      user.activeOnBoardingScreen === OnBoardingScreen.ChooseInteresedThings ||
      user.activeOnBoardingScreen === OnBoardingScreen.ChooseIndustryType
    ) {
      return routes.selectIndustryOrInterest;
    }

    if (user.activeOnBoardingScreen === OnBoardingScreen.SelectUsersToFollow) {
      return routes.addFollowersPage;
    }

    if (
      user.activeOnBoardingScreen ===
      OnBoardingScreen.SelectInterestedCommunities
    ) {
      return routes.communitiesPage;
    }

    if (
      user.activeOnBoardingScreen === OnBoardingScreen.SubscribeLatestChannels
    ) {
      return routes.newsLetterSuggestionPage;
    }

    if (user.activeOnBoardingScreen === OnBoardingScreen.ChooseAvatar) {
      return routes.chooseAvatarPage;
    }
    if (
      user.activeOnBoardingScreen === OnBoardingScreen.AcceptTermsOfService ||
      user.activeOnBoardingScreen === OnBoardingScreen.FeaturePopupScreen
    ) {
      return routes.onBoardingAcceptTermsAndCondition;
    }

    if (
      user.activeOnBoardingScreen ===
      OnBoardingScreen.WelcomeScreenAfterOnboarding
    ) {
      return routes.onBoardingWelcome;
    }

    return routes.onboarding;
  }

  async googleLogin(googleToken: string, passkey: string) {
    try {
      const response = await AuthClient.mutation(GOOGLE_LOGIN_MUTATION, {
        googleToken,
        passkey,
      });
      ToastService.success(messages.loginSuccess);
      if (response?.data) {
        const { accessToken } = response.data?.googleSignin;
        if (!!accessToken) {
          const userAuthDetails: any = jwtDecode(accessToken);
          window.localStorage.setItem(ACCESS_TOKEN, accessToken);
          return { accessToken, ...userAuthDetails };
        }
      }
    } catch (error: any) {
      ToastService.error(error.message);
    }
  }

  async sendOtp() {
    const res = await AuthClient.mutation(
      REQUEST_OTP_FOR_LOCAL_LOGIN,
      {}
    ).catch((err) => {
      ToastService.error(err.message);
    });

    if (res.errors) {
      ToastService.error(res.errors[0].message);
    }

    return res;
  }

  async resendOTPForSignin() {
    const res = await AuthClient.mutation(RESEND_OTP_FOR_SIGNIN, {}).catch(
      (err) => {
        ToastService.error(err.message);
      }
    );

    if (res.errors) {
      ToastService.error(res.errors[0].message);
    }
    ToastService.success("OTP re-sent!");
    return res;
  }

  async sendForgotPasswordEmail({ email }: any) {
    const response = await AuthClient.mutation(FORGOT_PASSWORD_MUTATION, {
      email,
    });
  }

  async isEmailVerified() {
    try {
      const response = await AuthClient.mutation(IS_EMAIL_VERIFIED, {});

      if (response?.data) {
        this.saveUserToken(response?.data?.isEmailVerified?.accessToken);
        return response.data.isEmailVerified;
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async addUserExperince(data: any) {
    const UserExperience = { ...data };
    try {
      const res = await AuthClient.mutation(ADD_USER_EXPERINCE, {
        UserExperience,
      });
      if (res) ToastService.success("User experience update successfully.");
    } catch (err: any) {
      console.log(err);
      ToastService.error(err.message);
    }
  }

  async getUserInfo(id: string) {
    try {
      const res = await AuthClient.query(FETCH_USER_INFO, {
        variables: { id: id },
      });
      return res;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async getMyJobExperienceInfo() {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const { id }: any = decoded;
      const { data } = await this.getUserInfo(id);
      return data;
    } else {
      return;
    }
  }
}

export default new AuthService();
