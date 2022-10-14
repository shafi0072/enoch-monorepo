import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import GoogleLogin from "react-google-login";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginTypes } from "../../../../constants/loginTypes";
import { routes } from "../../../../constants/routes";
import useIsLoggedIn from "../../../../hooks/useIsLoggedIn";
import AuthService from "../../../../services/AuthService";
import { Button, InputFieldWrapper, Modal, RadioInput } from "../../../core";
import AboutEnoch from "../../../core/components/AboutEnoch";
import GoogleAuthPassKeyModal from "./GoogleAuthPassKeyModal";
import { signInValidationSchema } from "./LoginFormValidationSchema";

export type LoginFormValues = {
  email: string;
  password: string;
  authMode: string;
  passkey: string;
};

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const LoginCompoment: React.FC = () => {
  const [loginType, setLoginType] = useState(LoginTypes.passkey);
  const [isPassKeyEnabled, setIsPassKeyEnabled] = useState<boolean>(false);
  const [showGooglePassKeyModal, setShowGooglePassKeyModal] =
    useState<boolean>(false);
  const [googleToken, setGoogleToken] = useState<string>("");
  useIsLoggedIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: yupResolver(signInValidationSchema),
  });

  const changeLoginType = useCallback((type: LoginTypes) => {
    setLoginType(type);
  }, []);

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
    async ({ email, password, passkey }) => {
      const response = await AuthService.onSignIn({ email, password, passkey });
      if (response) {
        const { is2FAEnabled, isEmailVerified } = response;
        router.replace(
          !is2FAEnabled
            ? routes.chooseAuthMethod
            : isEmailVerified
            ? routes.enterOTP
            : routes.verifyYourEmail
        );
      }
    },
    []
  );

  const responseGoogle = useCallback(
    async ({ accessToken, tokenId, tokenObj, ...rest }) => {
      // Passkey should come from popup;

      setGoogleToken(tokenObj?.id_token);
      setShowGooglePassKeyModal(!showGooglePassKeyModal);
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
                <AboutEnoch />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <InputFieldWrapper
                        label="Email or Phone number*"
                        type="text"
                        placeholder="Email ID or Phone number"
                        register={register}
                        error={errors.email}
                        getFieldState={getFieldState}
                        name="email"
                      />
                    </div>
                    <div className="col-md-12 mb-2">
                      <InputFieldWrapper
                        type="password"
                        placeholder="Password"
                        label="Password*"
                        register={register}
                        getFieldState={getFieldState}
                        error={errors.password}
                        name="password"
                      />
                    </div>
                    <div className="col-md-12 mb-0">
                      <div className="signup-selectAuth-mode">
                        <h3>Select authentication mode</h3>
                        <div className="signup-authBlock">
                          <label
                            onClick={() => changeLoginType(LoginTypes.passkey)}
                            className="signup-authBlock-selectMode"
                          >
                            Passkey
                            <span
                              style={{ marginLeft: 15 }}
                              className="authBlock-info "
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
                              handler={() => setIsPassKeyEnabled(true)}
                            />
                            <span className="selectModecheckmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="auth-tab-content">
                        <div
                          style={
                            isPassKeyEnabled
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          id="auth-passkey"
                          className="auth-tab-pane"
                        >
                          <div className="col-md-12 px-0">
                            <InputFieldWrapper
                              type="text"
                              placeholder="Enter your passkey"
                              name="passkey"
                              label=""
                              register={register}
                              getFieldState={getFieldState}
                              error={errors.passkey}
                            />
                          </div>
                        </div>
                        <div
                          id="nft-passkey"
                          className="auth-tab-pane"
                          style={
                            loginType === LoginTypes.nftPass
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <div className="nft-passkey-block">
                            <div>
                              <button type="button" className="nft-passkey-btn">
                                Connect to Wallet
                              </button>
                              <button
                                type="button"
                                className="nft-passkey-btn2"
                              >
                                <img
                                  src="/images/connect-icon.svg"
                                  className="img-fluid mr-2"
                                />
                                Wallet Connected
                              </button>
                            </div>
                            <p className="nft-passConnected-txt">
                              <span className="mr-2">
                                <img
                                  src="/images/authenticated-icon.png"
                                  alt="authenticate"
                                  className="img-fluid"
                                />
                              </span>
                              NFT pass authenticated
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="signin-check">
                        <label className="signcheckbox-container">
                          Remember me
                          <input type="checkbox" defaultChecked />
                          <span className="signcontactcheckmark"></span>
                        </label>
                        <span>
                          <Link passHref href="/auth/forgot-password">
                            <a href="">Forgot Password?</a>
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="signup-btn-grp">
                        <Button
                          text="Sign In"
                          type="submit"
                          className="sign-up-button text-capitalize"
                        />
                        <span>or</span>
                        {!!googleClientId && (
                          <GoogleLogin
                            clientId={googleClientId}
                            buttonText="SIGN IN WITH GOOGLE"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            icon={false}
                            className="googleAuthButton"
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <Link href="/auth/register" passHref>
                        <p className="signin-bttm-xt">
                          Not Registered yet? &nbsp;
                          <a href="#" className="signin-btn">
                            Create an account
                          </a>
                        </p>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="sign-up-bg-image custm-v-height">
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

export default LoginCompoment;
