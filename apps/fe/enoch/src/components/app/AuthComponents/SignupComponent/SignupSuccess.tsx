import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { routes } from "../../../../constants/routes";
import AuthService from "../../../../services/AuthService";
import { decodeTokenValue } from "../../../../utils";
import { Button } from "../../../core";

export interface UserInfoInterface {
  email: string;
  exp?: number;
  iat?: number;
  is2FAEnabled?: boolean;
  is2FAVerified?: boolean;
  isEmailVerified?: boolean;
  isLocalVerified?: boolean;
  isMobileVerified?: boolean;
  sub?: string;
}

const SignupSuccess = () => {
  const router = useRouter();
  const onReSendEmail = useCallback(async () => {
    const userInfo: any = decodeTokenValue();
    if (!userInfo?.isEmailVerified) {
      AuthService.resendVerifyEmail();
    }
  }, []);

  useEffect(() => {
    const token = AuthService.getAccessToken();
    if (token) {
      AuthService.isEmailVerified().then((res) => {
        if (res?.isEmailVerified) {
          router.replace(routes.chooseAuthMethod);
        }
      });
    }
  }, []);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="sign-in-form">
              <div className="mailbox-head mb-0">
                <div className="dapp-header-logo">
                  <img
                    src="/images/logo-big.png"
                    alt="logo"
                    className="img-fluid"
                  />
                </div>
                <h2>
                  Great check your
                  <br />
                  inbox
                </h2>
                <p className="mailbox-txt">
                  Thanks for signing up! We just need you to verify email
                  address to complete setting up the account
                </p>
                <p className="mailbox-txt2">
                  Didn’t receive an email from us?{" "}
                  <a className="text-decoration-none" href="#">
                    contact us
                  </a>
                </p>
              </div>

              <div className="d-flex">
                <Button
                  text="Resend email"
                  type="button"
                  className="bttn-primary dapp-verify-btn mt-0"
                  handler={() => onReSendEmail()}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 p-0">
            <div className="sign-up-bg-image">
              <div className="twitwr-img">
                <a href="#">
                  <img
                    src="/images/twitter.png"
                    alt="twitter"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div>
                <img
                  src="/images/signup.png"
                  alt="signup"
                  className="img-fluid"
                />
              </div>
              <div className="top-corner">
                <img
                  src="/images/img1.png"
                  alt="signup"
                  className="img-fluid"
                />
              </div>
              <div className="bottom-corner">
                <img
                  src="/images/img2.png"
                  alt="signup"
                  className="img-fluid"
                />
              </div>

              <div className="linkedin-img">
                <a href="#">
                  <img
                    src="/images/linkedin.png"
                    alt="linkedin"
                    className="img-fluid"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupSuccess;
