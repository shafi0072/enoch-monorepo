import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { routes } from "../../../../constants/routes";
import { SecurityCodeLength } from "../../../../constants/two-factor-auth";
import { VERIFY_USER_OTP } from "../../../../graphql/mutations/verifyUserOTP";
import { messages } from "../../../../locals/en-US";
import AuthClient from "../../../../services/AuthClient";
import AuthService from "../../../../services/AuthService";
import OtpModule from "../../../core/lib/OtpModule";

const EnterOTPComponent = () => {
  const router = useRouter();
  const [OTPError, setOTPError] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");
  const [_2FaAuthType, set2FaAuthType] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      const { _2FAuthenticationType }: any = AuthService.decodeToken(token);
      set2FaAuthType(_2FAuthenticationType);
    }
  }, []);

  const changeSecurityCode = useCallback((value: string) => {
    setOTPError("");
    setSecurityCode(value);
  }, []);

  const verifyOTP = useCallback(async () => {
    if (securityCode.length === SecurityCodeLength) {
      const response = await AuthClient.mutation(VERIFY_USER_OTP, {
        OTP: securityCode,
      }).catch((err) => {
        toast(err.message);
      });

      if (response?.errors) {
        toast(response.errors[0].message);
      }
      if (response?.data) {
        const {
          data: {
            verifyUserOTP: { accessToken, ...user },
          },
        } = response;
        await AuthService.saveUser(accessToken, user);
        router.replace(await AuthService.getCurrentOnboardingScreen(user));
      }
    } else {
      setOTPError(messages.shortOTPError);
    }
  }, [securityCode]);

  const resendOTP = useCallback(() => {
    AuthService.resendOTPForSignin();
  }, []);

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="signin-otp-form p-0">
              <div className="signin-head pt-5">
                <div className="dapp-header-logo">
                  <img
                    src="/images/logo-big.png"
                    alt="logo"
                    className="img-fluid"
                  />
                </div>
              </div>

              <div className="signin-otp-num">
                <div className="signin-otp-img">
                  <img
                    src="/images/otp-moobile.png"
                    alt="otp mobile"
                    className="img-fluid"
                  />
                </div>
                {_2FaAuthType === "Google" ? (
                  <p className="signin-otp-txt">
                    Open your Google Authenticator app and enter the code below.
                  </p>
                ) : (
                  <p className="signin-otp-txt">
                    Please enter the OTP sent to your mobile number
                  </p>
                )}
                <div className="sigin-otp-input">
                  <h3>Enter OTP</h3>
                  <OtpModule
                    onChange={changeSecurityCode}
                    length={SecurityCodeLength}
                    inputMode="number"
                    style={{ display: "flex", justifyContent: "space-between" }}
                    inputStyle={{
                      border: "1px solid",
                      borderColor: " #D4D8DD",
                      width: "62px",
                      height: "62px",
                      borderRadius: "4px",
                      fontWeight: "600",
                      fontSize: "36px",
                      fontFamily: "Poppins",
                    }}
                  />
                  <span style={{ color: "red" }}>{OTPError}</span>
                  {_2FaAuthType !== "Google" && (
                    <div className="signin-otpBtn">
                      <span>Did not recieved OTP?</span>
                      <span className="otp-resend-btn" onClick={resendOTP}>
                        Resend OTP
                      </span>
                    </div>
                  )}
                  <div className="text-center my-4">
                    <button className="optConfirm-bttn" onClick={verifyOTP}>
                      Confirm OTP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default EnterOTPComponent;
