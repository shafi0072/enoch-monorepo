import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import {
  REQUEST_OTP_FOR_PASSWORD_RECOVERY,
  VERIFY_OTP_FOR_PASSWORD_RECOVERY,
} from "../../../../graphql/mutations";
import AuthClient from "../../../../services/AuthClient";
import ToastService from "../../../../services/ToastService";
import { Button } from "../../../core";
import OtpModule from "../../../core/lib/OtpModule";

type Props = {
  setActiveComponent: any;
  _2FAresponse: any;
};

const EnterOTP = ({ setActiveComponent, _2FAresponse }: Props) => {
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
        routes.push(`/auth/reset-password?token=${accessToken}`);
      } else {
        ToastService.error("OTP is not verified");
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }, [otp]);

  const reSendOTP = useCallback(async () => {
    try {
      const res = await AuthClient.mutation(REQUEST_OTP_FOR_PASSWORD_RECOVERY, {
        token: _2FAresponse?.data?.recoverPasswordWith2FA?.accessToken,
      });
      ToastService.success("OTP sent");
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
              <div className="sign-in-form custm-sign-padd daap-request-otp-block">
                <div className="signin-head">
                  <div className="dapp-header-logo">
                    <img
                      src="/images/logo-big.png"
                      alt="logo"
                      className="img-fluid"
                    />
                  </div>
                  <h2 className="mb-0 ml5">Enter OTP</h2>

                  <p className="recovrd-pswrd-txt font-weight-semibold">
                    Use the OTP sent over your phone
                  </p>
                </div>
                <div className="verfication-key confirm-num-key">
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
                <p>
                  Didn't receive the OTP (One time password){" "}
                  <a
                    className="signin-btn text-decoration-none"
                    onClick={reSendOTP}
                    href="#"
                  >
                    Send again
                  </a>
                </p>
                <div className="">
                  <a className="text-decoration-none">
                    <Button
                      text="Proceed"
                      type="submit"
                      className="sign-up-button W-230"
                      handler={verifyOtp}
                    />
                  </a>
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

export default EnterOTP;
