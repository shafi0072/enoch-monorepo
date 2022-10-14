import React, { useCallback, useState } from "react";
import { REQUEST_OTP_FOR_PASSWORD_RECOVERY } from "../../../../graphql/mutations";
import AuthClient from "../../../../services/AuthClient";
import ToastService from "../../../../services/ToastService";
import { Button } from "../../../core";

type Props = {
  setActiveComponent: any;
  _2FAresponse: any;
};
const RecoverPasswordWithPhone = ({
  setActiveComponent,
  _2FAresponse,
}: Props) => {
  const [OTP, setOTP] = useState<boolean>(false);
  const requestOTPHandler = () => {
    setOTP(true);
  };
  const handler = () => {
    setActiveComponent("enterOTP");
  };

  const { countryCode, phoneNumber, accessToken } =
    _2FAresponse.data.recoverPasswordWith2FA;

  const sendOTP = useCallback(async () => {
    try {
      const res = await AuthClient.mutation(REQUEST_OTP_FOR_PASSWORD_RECOVERY, {
        token: accessToken,
      });
      ToastService.success("OTP sent");
      setOTP(true);
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }, []);
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="sign-in-form  custm-sign-padd daap-request-otp-block">
                <div className="signin-head">
                  <div className="dapp-header-logo">
                    <img
                      src="/images/logo-big.png"
                      alt="logo"
                      className="img-fluid"
                    />
                  </div>
                  <h2 style={{ marginLeft: "-5px" }}>Recover Password</h2>
                  <p>Don’t worry happen to best of us</p>
                  <p className="recovrd-pswrd-txt">
                    We will sent the OTP on your registered phone number.
                  </p>
                </div>
                <div className="dapp-request-otp">
                  <h3>Phone number</h3>
                  <p>
                    Phone - ({countryCode})-XXXXXXXX{phoneNumber}
                  </p>
                </div>
                <div className="">
                  {OTP ? (
                    <Button
                      handler={handler}
                      text="Next"
                      type="submit"
                      className="sign-up-button W-230"
                    />
                  ) : (
                    <Button
                      text="Request OTP"
                      handler={sendOTP}
                      type="submit"
                      className="sign-up-button W-230"
                    />
                  )}
                </div>

                {OTP && (
                  <div className="dapp-otp-sent-success">
                    <span>
                      <img
                        src="/images/daap-check.png"
                        alt="success"
                        className="img-fluid"
                      />
                    </span>
                    OTP sent successfully!
                  </div>
                )}
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

export default RecoverPasswordWithPhone;
