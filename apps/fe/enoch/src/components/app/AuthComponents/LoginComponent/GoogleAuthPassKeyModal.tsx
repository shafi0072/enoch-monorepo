import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { messages } from "../../../../locals/en-US";
import AuthService from "../../../../services/AuthService";
import { Button, InputFieldWrapper, RadioInput } from "../../../core";

export type GoogleAuthPassKey = {
  passkey: string;
  authMode: string;
  register?: any;
};

export default function GoogleAuthPassKeyModal({
  accessToken,
  setShowGooglePassKeyModal
}: any) {
  const router = useRouter();
  const [isPassKeyEnabled, setIsPassKeyEnabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors }
  } = useForm<GoogleAuthPassKey>({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        authMode: yup
          .string()
          .required()
          .typeError(messages.authModeRequired),
        passkey: yup.string().required(messages.passkeyRequired)
      })
    )
  });

  const onSubmit: SubmitHandler<GoogleAuthPassKey> = useCallback(
    async ({ passkey }) => {
      //  const passkey = "Aut-582622";
      const response = await AuthService.googleLogin(accessToken, passkey);
      if (response) {
        const { is2FAEnabled } = response;
        router.replace(
          !is2FAEnabled ? "/auth/choose-auth-method" : "/auth/enter-otp"
        );
      }
      setShowGooglePassKeyModal(false);
    },
    [accessToken]
  );

  return (
    <div className="sign-up-form bg-white p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Select authentication mode</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="p-0">
              The world’s largest avatar-based social commerce takes place
              inside a virtual world powered blockchain metaverse
            </p>
            <hr className="mb-3" />
            <div className="signup-authBlock py-2">
              <label className="signup-authBlock-selectMode">
                <span>Passkey</span>
                <span style={{ marginLeft: 15 }} className="authBlock-info ">
                  <img
                    src="/images/passkey-icon.png"
                    alt="passkey"
                    className="img-fluid"
                  />
                  <p className="authBlock-info-txt">
                    Currently, the application is not open for everyone. A
                    passkey provides an exculsive access to selected members for
                    accessing the Enoch application. <br />
                    The passkey must have been provided to you by the core team.
                  </p>
                </span>
                <RadioInput
                  register={register}
                  error={errors?.authMode}
                  type="radio"
                  name="authMode"
                  handler={() => setIsPassKeyEnabled(true)}
                />
                <span className="selectModecheckmark"></span>
              </label>
            </div>
            <hr />
          </div>
        </div>
        {isPassKeyEnabled && (
          <div className="row">
            <div className="col-md-12  p-2">
              <InputFieldWrapper
                type="text"
                placeholder="Enter your passkey"
                name="passkey"
                label=""
                register={register}
                getFieldState={getFieldState}
                error={errors.passkey}
              />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <Button
              type="button"
              className="onboarding-rest-bttn"
              text="Back"
              handler={() => setShowGooglePassKeyModal(false)}
            />
            <Button
              type="submit"
              className="bunsinss-nxt-bttn"
              text="Next"
              handler={() => null}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
