import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AuthService from "../../../../services/AuthService";
import { Button, Logo } from "../../../core";

export const VerifyUserEmailComponent = () => {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!!Reflect.ownKeys(router.query).length) {
      const { token } = router.query;
      onVerifyAccessToken(token);
    }
  }, [router.query]);

  const onVerifyAccessToken = useCallback(async (token) => {
    const response = await AuthService.onVerifyAccessToken(token);
    setName(response?.firstName);

    if (response) {
      setTimeout(() => {
        router.replace("/auth/login");
      }, 3000);
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="verified-body vh-100 m-0">
          <div className="verified-header-logo">
            <Logo />
          </div>
          <div className="verified-img">
            <img
              src="/images/email-verified.png"
              alt="email-verified"
              className="img-fluid"
            />
          </div>
          <h2>Hello, {name}</h2>
          <p className="verified-txt1">Your email address is verfied!</p>
          <p className="verified-txt2">
            Go to your account and feel free to contact us if you have any
            questions.
            <br />
            It's great to have you on board!
          </p>
          <div>
            <Button
              text="Sign in Now"
              type="button"
              handler={() => router.replace("/auth/login")}
              className="btn bttn-primary verified-mail-btn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
