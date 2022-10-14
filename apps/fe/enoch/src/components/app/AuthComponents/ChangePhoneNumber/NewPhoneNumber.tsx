import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { regExpression } from "../../../../constants/regEx";
import { CHANGE_MY_PHONE_NUMBER } from "../../../../graphql/mutations";
import { messages } from "../../../../locals/en-US";
import AuthClient from "../../../../services/AuthClient";
import ToastService from "../../../../services/ToastService";
import { InputFieldWrapper } from "../../../core";
import CountryCode from "../../../core/components/onboarding/CountryCode";

export interface ChangePhoneNumberProps {
  onClose: () => void;
}

const NewPhoneNumber: FC<ChangePhoneNumberProps> = ({ onClose }) => {
  const router = useRouter();
  const phoneNumberSchema = Yup.object().shape({
    countryCode: Yup.string().required(messages.countryCode),
    phoneNumber: Yup.string()
      .required(messages.phoneRequired)
      .matches(regExpression.phoneRegex, messages.phoneError),
  });
  const {
    handleSubmit,
    register,
    getFieldState,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(phoneNumberSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(async (data: any) => {
    try {
      const res = await AuthClient.mutation(CHANGE_MY_PHONE_NUMBER, {
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber,
      });
      if (res) {
        router.push("/auth/enter-otp");
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }, []);
  return (
    <div className="modal-content dapp-change-number ">
      <span className="close">
        <img
          src="/images/popupCross.png"
          alt="close"
          className="img-fluid"
          onClick={onClose}
        />
      </span>
      <div className="change-no-header">ENTER NEW phone NUMBER</div>
      <div className="dapp-change-number-nxt">
        <p>
          In order to change your Phone number, we have sent security code on
          your registered mail id.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="change-number-blocks"
        >
          <div className="sign-form-input d-flex mb-0">
            <div className="">
              <CountryCode
                control={control}
                placeholder="Country"
                name="countryCode"
              />
            </div>
            <div className="signup-number w-100">
              <InputFieldWrapper
                className="border-0"
                name="phoneNumber"
                getFieldState={getFieldState}
                register={register}
                error={errors.phoneNumber}
                type="text"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="d-flex dApp-confirm-btn">
            <button type="submit" className="btn bttn-primary">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPhoneNumber;
