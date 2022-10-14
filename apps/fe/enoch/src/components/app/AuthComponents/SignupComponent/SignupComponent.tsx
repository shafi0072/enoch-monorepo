import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { routes } from "../../../../constants/routes";
import { CountryCodesInterface } from "../../../../interfaces/auth-interface";
import AuthService from "../../../../services/AuthService";
import { pick } from "../../../../utils/lodash";
import {
  Button,
  CheckBoxInput,
  InputFieldWrapper,
  Modal,
  RadioInput,
} from "../../../core";
import CountryCode from "../../../core/components/onboarding/CountryCode";
import GoogleAuthPassKeyModal from "../LoginComponent/GoogleAuthPassKeyModal";
import { signupValidationSchema } from "./SignupFormValidationSchema";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const SignupComponent: NextPage = () => {
  const router = useRouter();
  const [isPassKeyEnabled, setIsPassKeyEnabled] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState([
    { label: "", value: "" },
  ]);
  const [showGooglePassKeyModal, setShowGooglePassKeyModal] =
    useState<boolean>(false);
  const [googleToken, setGoogleToken] = useState<string>("");

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  const fetchCountryCodes = useCallback(async () => {
    const countryCode = await AuthService.getCountryCodes();
    if (countryCode) {
      const options = countryCode.map(
        ({ dial_code, code }: CountryCodesInterface) => {
          return {
            label: `${dial_code} (${code})`,
            value: dial_code,
          };
        }
      );
      setCountryOptions([...options]);
    }
  }, []);

  const {
    handleSubmit,
    register,
    getFieldState,
    getValues,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
    mode: "onChange",
  });

  const handleAuthMode = useCallback((isActivePassKey: boolean) => {
    setIsPassKeyEnabled(isActivePassKey);
  }, []);

  const onSubmitForm = useCallback(async (data: any) => {
    const CreateUserInput = pick(data, [
      "firstName",
      "lastName",
      "email",
      "countryCode",
      "phoneNumber",
      "password",
      "repeatPassword",
      "isAgreedToTerms",
      "subscribedToEnochMails",
    ]);

    const response = await AuthService.onSignUp({
      CreateUserInput,
      passkey: data.passkey,
    });
    if (response) {
      router.push(routes.verifyYourEmail);
    }
  }, []);

  const responseGoogle = useCallback(
    async ({ accessToken, tokenId, tokenObj, ...rest }: any) => {
      // Passkey should come from popup;
      if (tokenObj?.id_token) {
        setGoogleToken(tokenObj?.id_token);
        setShowGooglePassKeyModal(true);
      }
    },
    [showGooglePassKeyModal]
  );

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="sign-up-form custm-sign-padd">
                <div className="signup-head2">
                  <div className="dapp-header-logo2">
                    <img
                      src="/images/logo-big.png"
                      alt="logo"
                      className="img-fluid"
                    />
                  </div>
                  <p className="sign-para-txt">
                    The world’s largest avatar-based social commerce takes place
                    inside a virtual world powered blockchain metaverse where
                    players play to earn Crypto & NFT through shared
                    experiences, build deeper friendships, creativity counts,
                    and all relationships matter.{" "}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmitForm)}
                  action=""
                  method="post"
                >
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <InputFieldWrapper
                        name="firstName"
                        getFieldState={getFieldState}
                        register={register}
                        error={errors.firstName}
                        type="text"
                        placeholder="First name*"
                        getValues={getValues}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <InputFieldWrapper
                        name="lastName"
                        getFieldState={getFieldState}
                        register={register}
                        error={errors.lastName}
                        type="text"
                        placeholder="Last name*"
                        getValues={getValues}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <InputFieldWrapper
                        name="email"
                        getFieldState={getFieldState}
                        register={register}
                        error={errors.email}
                        type="email"
                        placeholder="Email*"
                        getValues={getValues}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 pb-4">
                      <CountryCode
                        control={control}
                        placeholder="Country*"
                        name="countryCode"
                      />
                      <div className="error-msg">
                        {errors?.countryCode?.message}
                      </div>
                    </div>

                    <div className="col-md-9 mb-2">
                      <InputFieldWrapper
                        name="phoneNumber"
                        getFieldState={getFieldState}
                        register={register}
                        error={errors.phoneNumber}
                        type="tel"
                        placeholder="Phone Number*"
                        getValues={getValues}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <InputFieldWrapper
                        name="password"
                        getFieldState={getFieldState}
                        type="password"
                        placeholder="Password*"
                        register={register}
                        error={errors.password}
                        getValues={getValues}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <InputFieldWrapper
                        name="repeatPassword"
                        getFieldState={getFieldState}
                        register={register}
                        error={errors.repeatPassword}
                        type="password"
                        placeholder="Repeat password"
                        getValues={getValues}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p className="signup-form-bttm-xt mb-0 mt-0">
                        Use 8 or more characters with a mix of letters, atleast
                        one uppercase, numbers & symbols
                      </p>
                    </div>
                    <div className="col-md-12 mb-2">
                      <div className="signup-selectAuth-mode">
                        <h3>Select authentication mode</h3>

                        <div className="signup-authBlock">
                          <label className="signup-authBlock-selectMode">
                            Passkey
                            <span
                              className="authBlock-info"
                              style={{ marginLeft: "15px" }}
                            >
                              <img
                                src="/images/passkey-icon.png"
                                alt="passkey"
                                className="img-fluid"
                              />
                              <p className="authBlock-info-txt">
                                Currently, the application is not open for
                                everyone. A passkey provides an exculsive access
                                to selected members for accessing the Enoch
                                application. <br />
                                The passkey must have been provided to you by
                                the core team.
                              </p>
                            </span>
                            <RadioInput
                              register={register}
                              error={errors?.authMode}
                              type="radio"
                              name="authMode"
                              handler={() => handleAuthMode(true)}
                            />
                            <span className="selectModecheckmark"></span>
                          </label>
                        </div>
                      </div>
                      {isPassKeyEnabled && (
                        <div className="auth-tab-content mb-4">
                          <div
                            id="auth-passkey"
                            className="auth-tab-pane d-block"
                          >
                            <InputFieldWrapper
                              type="text"
                              register={register}
                              getFieldState={getFieldState}
                              name="passkey"
                              placeholder="Enter your passkey"
                              error={errors.passkey}
                              getValues={getValues}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-12">
                      <div className="signup-check">
                        <div>
                          <label className="signcheckbox-container">
                            I want to receive the emails from Enoch
                            <CheckBoxInput
                              type="checkbox"
                              error={errors.subscribedToEnochMails}
                              register={register}
                              name="subscribedToEnochMails"
                            />
                            <span className="signcontactcheckmark"></span>
                          </label>
                        </div>
                        <div>
                          <label className="signcheckbox-container">
                            I agree to the{" "}
                            <a
                              href="#"
                              className="sign-blue-clr text-decoration-none"
                            >
                              Privacy & Terms of service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="sign-blue-clr text-decoration-none"
                            >
                              fee
                            </a>
                            <CheckBoxInput
                              error={errors.isAgreedToTerms}
                              type="checkbox"
                              register={register}
                              name="isAgreedToTerms"
                            />
                            <span className="signcontactcheckmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="signup-btn-grp">
                        <Button
                          text="Sign up"
                          type="submit"
                          className="sign-up-button "
                        />

                        <span>or</span>
                        {!!googleClientId && (
                          <GoogleLogin
                            clientId={googleClientId}
                            className="googleAuthButton"
                            buttonText="SIGN UP WITH GOOGLE"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            icon={false}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <p className="signup-bttm-xt">
                        Already have an account?{" "}
                        <Link href="/auth/login">
                          <a className="text-decoration-none">Sign in</a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="sign-up-bg-image  custm-v-height-signup">
                <div className="sign-right-img">
                  <img
                    src="/images/signup.png"
                    alt="signup"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showGooglePassKeyModal && (
        <Modal isOpen className="d-flex">
          <GoogleAuthPassKeyModal
            accessToken={googleToken}
            setShowGooglePassKeyModal={setShowGooglePassKeyModal}
          />
        </Modal>
      )}
    </>
  );
};

export default SignupComponent;
