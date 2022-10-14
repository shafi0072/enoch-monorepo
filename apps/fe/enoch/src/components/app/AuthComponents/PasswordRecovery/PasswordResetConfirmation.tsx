import Link from "next/link";
import React from "react";
import { Button } from "../../../core";

const PasswordResetConfirmation = () => {
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="sign-in-form custm-sign-padd">
                <div className="signin-head">
                  <div className="dapp-header-logo mab-32">
                    <img
                      src="/images/logo-big.png"
                      alt="logo"
                      className="img-fluid"
                    />
                  </div>

                  <p>
                    <img
                      src="/images/email-sent.png"
                      alt="email-sent"
                      className="img-fluid"
                    />
                  </p>
                  <h2>Password reset </h2>
                  <div className="">
                    <Link href="/auth/login">
                      <a className="text-decoration-none">
                        <Button
                          text="Sign in now"
                          type="submit"
                          className="bttn-primary"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="sign-up-bg-image custm-v-height">
                <div className="twitwr-img">
                  <a href="#">
                    <img
                      src="/images/twitter.png"
                      alt="twitter"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="sign-right-img">
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
    </>
  );
};

export default PasswordResetConfirmation;
