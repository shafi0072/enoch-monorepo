import React, { useCallback } from "react";
import AuthService from "../../../../services/AuthService";
import ToastService from "../../../../services/ToastService";

const EmailSentConfirmation = ({ email }: any) => {
  const resendForgotPasswordEmail = useCallback(async () => {
    await AuthService.sendForgotPasswordEmail({ email });
    ToastService.success("Email resent!");
  }, [email]);
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="sign-in-form custm-sign-padd">
                <div className="signin-head">
                  <div className="dapp-header-logo">
                    <img
                      src="/images/logo-big.png"
                      alt="logo"
                      className="img-fluid"
                    />
                  </div>
                  <h2 style={{ marginLeft: "-5px" }}>Email sent</h2>
                  <p>
                    <img
                      src="/images/email-sent.png"
                      alt="email-sent"
                      className="img-fluid"
                    />
                  </p>
                  <p>
                    Check your email and open the link <br />
                    we sent you to continue
                  </p>
                  <button
                    type="button"
                    className="bttn-primary mt-4"
                    onClick={resendForgotPasswordEmail}
                  >
                    Resend Email
                  </button>
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

export default EmailSentConfirmation;
