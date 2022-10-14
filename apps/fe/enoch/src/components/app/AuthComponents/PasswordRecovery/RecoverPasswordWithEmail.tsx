import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { regExpression } from "../../../../constants/regEx";
import { RESET_PASSWORD_WITH_2FA } from "../../../../graphql/mutations";
import { messages } from "../../../../locals/en-US";
import AuthClient from "../../../../services/AuthClient";
import AuthService from "../../../../services/AuthService";
import ToastService from "../../../../services/ToastService";
import { Button, InputFieldWrapper } from "../../../core";

type Props = {
  setActiveComponent: any;
  set_2FAresponse?: any;
  setEmail?: any;
};
const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email(messages.emailRequired)
    .required(messages.emailRequired)
    .matches(
      regExpression.emailRegex.mailFormat,
      messages.emailStandard.mailFormat
    ),
});
const RecoverPasswordWithEmail = ({
  setActiveComponent,
  set_2FAresponse,
  setEmail,
}: Props) => {
  const {
    handleSubmit,
    register,
    getFieldState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onChange",
  });

  const formSubmit = async (data: any) => {
    try {
      const email = data["email"];
      await AuthService.sendForgotPasswordEmail({ email });
      setEmail(email);
      setActiveComponent("emailsentconfirmation");
    } catch (err: any) {
      const notify = () => toast.error(err.message);
      notify();
    }
  };

  const handleDifferentMethod = useCallback(async (data: any) => {
    try {
      const res = await AuthClient.mutation(RESET_PASSWORD_WITH_2FA, {
        recoverPasswordInput: {
          email: data.email,
        },
      });
      set_2FAresponse(res);
      const {
        data: {
          recoverPasswordWith2FA: { _2FAAuthenticationType },
        },
      } = res;
      if (_2FAAuthenticationType === "Local") {
        setActiveComponent("recoverpasswordwithphone");
      } else {
        setActiveComponent("enterOTPforGoogle");
      }
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
              <div className="sign-in-form custm-sign-padd">
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
                  <h2 className="mb-0">Recover Password</h2>
                  <p>Don’t worry happen to best of us</p>
                  <p className="recovrd-pswrd-txt">
                    Enter your mail id and we’ll send you a link to reset your
                    password
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
                        error={errors.email}
                        getFieldState={getFieldState}
                        name="email"
                        type="email"
                        label="Email address"
                        placeholder="Email id"
                      />
                    </div>

                    <div className="col-md-12">
                      <Button
                        text="Send link to email"
                        type="submit"
                        className="bttn-primary "
                      />
                    </div>
                    <div className="col-md-12">
                      <p className="signin-bttm-xt mt-2">
                        Not able to access email?{" "}
                        <a
                          onClick={handleSubmit(handleDifferentMethod)}
                          href="#"
                          className="signin-btn text-decoration-none"
                        >
                          Try diffrent method
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
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

export default RecoverPasswordWithEmail;
