import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { VERIFY_OTP_FOR_PASSWORD_RECOVERY } from "../../../../graphql/mutations";
import AuthClient from "../../../../services/AuthClient";
import ToastService from "../../../../services/ToastService";
import { Button } from "../../../core";
import OtpModule from "../../../core/lib/OtpModule";

type Props = {
  setActiveComponent: any;
  _2FAresponse: any;
};

const EnterOTPforGoogle = ({ _2FAresponse }: Props) => {
  const [otpLength, setOtpLength] = useState<number>(6);
  const [otp, setOtp] = useState<string>("");
  const routes = useRouter();

  const otpHandler = useCallback(
    (val: any) => {
      setOtp(val);
    },
    [otp]
  );

  const verifyOtp = useCallback(async () => {
    try {
      const res = await AuthClient.mutation(VERIFY_OTP_FOR_PASSWORD_RECOVERY, {
        token: _2FAresponse?.data?.recoverPasswordWith2FA?.accessToken,
        OTP: otp,
      });
      const {
        data: {
          verifyOtpForPasswordRecovery: { accessToken },
        },
      } = res;
      if (accessToken) {
        routes.push("/auth/reset-password");
      } else {
        ToastService.error("OTP is not verified");
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }, [otp]);
  return (
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
                <h2 className="ml5">Recover Password</h2>
                <p>Don’t worry happen to best of us</p>
                <p className="recovrd-pswrd-txt">
                  Open your Google Authenticator app and enter the code below.
                </p>
              </div>

              <div className="verfication-key confirm-num-key">
                <div className="='fullwith">
                  <OtpModule
                    onChange={otpHandler}
                    length={otpLength}
                    inputMode="number"
                    style={{ display: "flex", justifyContent: "space-between" }}
                    inputStyle={{
                      borderColor: "#2bbd54",
                      width: "14%",
                      height: "56px",
                      fontSize: "28px",
                      fontWeight: "600",
                      textAlign: "center",
                      borderRadius: "2px",
                      color: "#3F434A",
                      border: "1px solid #d4d8dd",
                      fontFamily: "Poppins",
                    }}
                  />
                </div>
              </div>
              <div className="">
                <Button
                  text="Next"
                  type="submit"
                  className="sign-up-button W-230"
                  handler={verifyOtp}
                />
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
  );
};

export default EnterOTPforGoogle;
