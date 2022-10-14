import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { smartPhoneAuthSteps } from "../../../../constants/smartPhoneAuthSteps";
import { Button, InputFieldWrapper } from "../../../core";
import SmartPhoneAuthStep from "./SmartPhoneAuthStep";
import { messages } from "../../../../locals/en-US";
import {
  SecurityCodeLength,
  TwoFactorAuthStages,
} from "../../../../constants/two-factor-auth";
import AuthClient from "../../../../services/AuthClient";
import { VERIFY_USER_OTP } from "../../../../graphql/mutations/verifyUserOTP";
import { toast, ToastContainer } from "react-toastify";
import { localStorageVariables } from "../../../../constants/localStorageVariables";
import { routes } from "../../../../constants/routes";
import AuthService from "../../../../services/AuthService";

interface BarcodeContainerProps {
  barcode: string;
  closeModal: () => void;
}

type otpType = {
  otp: string;
};

const BarcodeContainer: React.FC<BarcodeContainerProps> = ({
  barcode,
  closeModal,
}) => {
  const router = useRouter();
  const [OTPError, setOTPError] = useState("");

  const otpSchema = Yup.object().shape({
    otp: Yup.string().required(messages.otpRequired),
  });

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<otpType>({
    mode: "onChange",
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = useCallback(async (data: otpType) => {
    const { otp } = data;
    if (otp.length === SecurityCodeLength) {
      const response = await AuthClient.mutation(VERIFY_USER_OTP, {
        OTP: otp,
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
        const payload: any = AuthService.decodeToken(accessToken);

        router.push({
          pathname: routes.requestSMSOTP,
          query: {
            twoFactorAuthStage: TwoFactorAuthStages.twoFactorActivated,
            _2FAuthenticationType: payload._2FAuthenticationType,
          },
        });
      }
    } else {
      setOTPError(messages.shortOTPError);
    }
  }, []);

  return (
    <div className="modal-content">
      <img
        onClick={() => closeModal()}
        className="barcode-modal-close-btn"
        src="/images/black-cross.png"
      />

      <h5
        className="p-3"
        style={{
          fontWeight: 700,
          borderBottom: "1px solid #d4d8dd",
          width: "100%",
        }}
      >
        Configure Two Factor Authentication
      </h5>
      <ul className="p-3">
        <SmartPhoneAuthStep
          stepDescription={smartPhoneAuthSteps.firstStep.description}
          stepNumber={smartPhoneAuthSteps.firstStep.stepNumber}
        />
        <SmartPhoneAuthStep
          stepDescription={smartPhoneAuthSteps.secondStep.description}
          stepNumber={smartPhoneAuthSteps.secondStep.stepNumber}
        />
        <div className="">
          <img className="mx-auto d-block" src={barcode} alt="barcode" />
        </div>

        <SmartPhoneAuthStep
          stepDescription={smartPhoneAuthSteps.thirdStep.description}
          stepNumber={smartPhoneAuthSteps.thirdStep.stepNumber}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-50 mt-3">
            <InputFieldWrapper
              customclassName="ms-5"
              type="text"
              name="otp"
              label=""
              register={register}
              placeholder="Enter generated password"
              getFieldState={getFieldState}
              error={errors?.otp}
            />
          </div>

          <span style={{ color: "red" }}>{OTPError}</span>

          <div className="w-100 d-flex flex-row justify-content-end mt-4 align-items-center">
            <span
              role="button"
              onClick={() => closeModal()}
              className="mr-4"
              style={{ color: "#8A9099" }}
            >
              Cancel
            </span>
            <Button
              text="confirm"
              type="submit"
              className="sign-up-button mb-0 ms-3"
            />
          </div>
        </form>
      </ul>
    </div>
  );
};

export default BarcodeContainer;
