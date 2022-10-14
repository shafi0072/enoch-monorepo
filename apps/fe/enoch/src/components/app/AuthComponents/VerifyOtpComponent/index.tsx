import React, { useCallback, useState } from "react";
import { localStorageVariables } from "../../../../constants/localStorageVariables";
import {
  SecurityCodeLength,
  TwoFactorAuthStages,
} from "../../../../constants/two-factor-auth";
import { VERIFY_USER_OTP } from "../../../../graphql/mutations/verifyUserOTP";
import AuthClient from "../../../../services/AuthClient";
import AuthService from "../../../../services/AuthService";
import ToastService from "../../../../services/ToastService";
import OtpModule from "../../../core/lib/OtpModule";
import { StageProps } from "../RequestSmsOtp";

const VerifySmsOtpComponent: React.FC<StageProps> = ({
  setTwoFactorAuthStage,
}) => {
  const [OTPError, setOTPError] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const changeSecurityCode = useCallback((value: string) => {
    setOTPError("");
    setSecurityCode(value);
  }, []);

  const resendOtp = useCallback(async () => {
    const res = await AuthService.sendOtp();
    if (res?.data?.requestOtpFor2FAVerification) {
      ToastService.success("OTP sent successfully.");
    }
  }, []);

  const verifyOTP = useCallback(async () => {
    if (securityCode.length === SecurityCodeLength) {
      const response = await AuthClient.mutation(VERIFY_USER_OTP, {
        OTP: securityCode,
      }).catch((err) => {
        ToastService.error(err.message);
      });

      if (response?.errors) {
        ToastService.error(response.errors[0].message);
      }
      if (response?.data) {
        const {
          data: {
            verifyUserOTP: { accessToken, ...user },
          },
        } = response;
        await AuthService.saveUser(accessToken, user);

        localStorage.setItem(localStorageVariables.ACCESS_TOKEN, accessToken);
        setTwoFactorAuthStage(TwoFactorAuthStages.twoFactorActivated);
      }
    } else {
      setOTPError("Please enter correct OTP");
    }
  }, [securityCode]);

  return (
    <>
      <div className="dapp-recovery-block">
        <div className="form-input-label">Please enter the security code</div>
        <div className="verfication-key confirm-num-key">
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
        </div>

        <span style={{ color: "red" }}>{OTPError}</span>
        <p className="dapp-recovery-block-txt">
          Didn’t reecive the OTP (One time Password)
          <a href="javascript:;" onClick={resendOtp} className="signin-btn">
            {" "}
            Send Again{" "}
          </a>
        </p>
      </div>
      <div onClick={verifyOTP} className="d-flex dApp-request-btn">
        <a href="#" className="btn bttn-primary">
          Confirm OTP
        </a>
      </div>
    </>
  );
};

export default VerifySmsOtpComponent;
