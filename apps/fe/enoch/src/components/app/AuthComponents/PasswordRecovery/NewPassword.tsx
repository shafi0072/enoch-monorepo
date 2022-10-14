import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { regExpression } from "../../../../constants/regEx";
import { SET_NEW_PASSWORD_MUTATION } from "../../../../graphql/mutations";
import { messages } from "../../../../locals/en-US";
import AuthClient from "../../../../services/AuthClient";
import ToastService from "../../../../services/ToastService";
import { Button, InputFieldWrapper } from "../../../core";

type Props = {
  setActiveComponent: any;
};
const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required(messages.passwordRequired)
    .min(8, messages.shortPassword)
    .max(15, messages.longPassword)
    .matches(
      regExpression.passwordRegex.lowercase,
      messages.passwordStandard.lowercase
    )
    .matches(
      regExpression.passwordRegex.uppercase,
      messages.passwordStandard.uppercase
    )
    .matches(
      regExpression.passwordRegex.specialChar,
      messages.passwordStandard.specialChar
    )
    .matches(
      regExpression.passwordRegex.number,
      messages.passwordStandard.number
    ),
  confirmPassword: yup
    .string()
    .required(messages.requiredConfirmPassword)
    .oneOf([yup.ref("password"), null], messages.confirmPassword),
});
const NewPassword = ({ setActiveComponent }: Props) => {
  const {
    handleSubmit,
    register,
    getFieldState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
    mode: "onChange",
  });

  const { query } = useRouter();

  const formSubmit = async (data: any) => {
    try {
      const response = await AuthClient.mutation(SET_NEW_PASSWORD_MUTATION, {
        password: data.password,
        confirmPassword: data.confirmPassword,
        token: query.token,
      });

      setActiveComponent("passwordresetconfirmation");
    } catch (err: any) {
      ToastService.error(err?.message);
    }
  };

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="sign-up-form custm-sign-padd">
                <div className="signin-head">
                  <div className="dapp-header-logo2">
                    <img
                      src="/images/logo-big.png"
                      alt="logo"
                      className="img-fluid"
                    />
                  </div>
                  <p className="sign-para-txt">
                    The world’s largest avatar-based social commerce takes place
                    inside a virtual world powered blockchain metaverse where
                    players play to earn Crypto & NFT through shared
                    experiences, build deeper friendships, creativity counts,
                    and all relationships matter.{" "}
                  </p>
                  <h2 className="mb-1">New Password</h2>
                  <p className="new-passwrd-change">
                    Use 8 or more characters with a mix of letters, atleast one
                    uppercase, numbers & symbols
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(formSubmit)}
                  action=""
                  method="post"
                >
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <InputFieldWrapper
                        register={register}
                        error={errors.password}
                        name="password"
                        getFieldState={getFieldState}
                        // label="Email*"
                        type="password"
                        placeholder="Password"
                      />
                    </div>

                    <div className="col-md-12 mb-2">
                      <InputFieldWrapper
                        register={register}
                        error={errors.confirmPassword}
                        getFieldState={getFieldState}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        // label="Password*"
                      />
                    </div>

                    <div className="col-md-12">
                      <div className="signup-btn-grp">
                        <Button
                          text="Reset Password"
                          type="submit"
                          className="bttn-primary"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="sign-up-bg-image custm-v-height">
                <div className="sign-right-img">
                  <img
                    src="/images/signup.png"
                    alt="signup"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewPassword;
