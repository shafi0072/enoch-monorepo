import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { TwoFactorAuthStages } from "../../../../constants/two-factor-auth";
import { CHANGE_PHONE_NUMBER_REQUEST } from "../../../../graphql/mutations";
import { ADD_PHONE_NUMBER_FOR_VERIFICATION_MUTATION } from "../../../../graphql/mutations/requestOTP";
import { messages } from "../../../../locals/en-US";
import AuthClient from "../../../../services/AuthClient";
import AuthService from "../../../../services/AuthService";
import ToastService from "../../../../services/ToastService";
import { InputField } from "../../../core";
import CountryCode from "../../../core/components/onboarding/CountryCode";

type phoneNumberType = {
  phoneNumber: string;
  countryCode: string;
};

export interface StageProps {
  setTwoFactorAuthStage: any;
  setisOpen: Dispatch<SetStateAction<boolean>>;
}
const phoneNumberSchema = Yup.object().shape({
  countryCode: Yup.string().required(messages.countryRequired),
  phoneNumber: Yup.string().required(messages.phoneNumberRequired),
});

const RequestSmsOtp: React.FC<StageProps> = ({
  setTwoFactorAuthStage,
  setisOpen,
}) => {
  const [signupType, setSignupType] = useState("Local");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
    control,
  } = useForm<phoneNumberType>({
    mode: "onChange",
    resolver: yupResolver(phoneNumberSchema),
  });

  useEffect(() => {
    const payload: any = AuthService.decodeToken(AuthService.getAccessToken());
    console.log({ payload });

    const { signUpType, phoneNumber, countryCode } = payload;
    setSignupType(signUpType);
    setPhoneNumber(phoneNumber);
    setCountryCode(countryCode);
  }, []);

  const onSubmit = useCallback(
    async (data: phoneNumberType) => {
      const res = await AuthClient.mutation(
        ADD_PHONE_NUMBER_FOR_VERIFICATION_MUTATION,
        data
      ).catch((err) => {
        ToastService.error(err.message);
      });

      if (res.errors) {
        ToastService.error(res.errors[0].message);
      }

      if (res?.data?.addPhoneNumberForVerification) {
        ToastService.success("OTP sent successfully.");
        setTimeout(() => {
          setTwoFactorAuthStage(TwoFactorAuthStages.verifyOTP);
        }, 1000);
      }
    },
    [signupType]
  );

  const handleSubmitLocal = useCallback(async () => {
    const res = await AuthService.sendOtp();
    if (res?.data?.requestOtpFor2FAVerification) {
      ToastService.success("OTP sent successfully.");
      setTimeout(() => {
        setTwoFactorAuthStage(TwoFactorAuthStages.verifyOTP);
      }, 1000);
    }
  }, []);

  const ChangePhoneNumberRequest = useCallback(async () => {
    try {
      const res = await AuthClient.mutation(CHANGE_PHONE_NUMBER_REQUEST, {});
      if (res) {
        setisOpen(true);
      } else {
        ToastService.error("Something went wrong");
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dapp-recovery-block">
        <div className="form-input-label">Your Phone number</div>
        {signupType === "Google" ? (
          <div className="row">
            <div className="col-md-3">
              <CountryCode
                name="countryCode"
                control={control}
                placeholder="Country*"
              />
              <div className="error-msg">{errors.countryCode?.message}</div>
            </div>
            <div className="col-md-9 sign-form-input">
              <InputField
                type="text"
                placeholder="Phone-0044 - (+XX)-XXXXXXXX73 "
                name="phoneNumber"
                label=""
                register={register}
              />
            </div>
          </div>
        ) : (
          <div className="row m-0">
            <div className="d-flex align-items-center sign-form-input">
              Phone-0044 - ({countryCode})-XXXXXXXX{phoneNumber}
            </div>
          </div>
        )}
        <p className="dapp-recovery-block-txt">
          Do you want to use the same number or willing to
          <a
            onClick={ChangePhoneNumberRequest}
            className="signin-btn"
            style={{ color: "purple" }}
          >
            {" "}
            change{" "}
          </a>
          it.
        </p>
      </div>
      <div className="d-flex dApp-request-btn">
        {signupType === "Local" ? (
          <button
            type="button"
            onClick={handleSubmitLocal}
            className="btn bttn-primary browser-next"
          >
            Request OTP
          </button>
        ) : (
          <button type="submit" className="btn bttn-primary browser-next">
            Request OTP
          </button>
        )}
      </div>
    </form>
  );
};

export default RequestSmsOtp;
