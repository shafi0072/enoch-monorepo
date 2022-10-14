import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import AboutEnoch from "../../../core/components/AboutEnoch";

const GoogleType = 'Google';
const Activated2faComponent = () => {
  const router = useRouter();
  const authenticatorType = router.query?._2FAuthenticationType === GoogleType ? "Google" :  "SMS/Phone";
  return (
    <>
      <h2>Activate 2-Step verification - {authenticatorType} request</h2>
      <div className="dapp-recovery-phn">
        <span>
          <img src="/images/auth-check2.png" alt="logo" className="img-fluid" />
        </span>
        2-Step verification with {authenticatorType} is activated
      </div>
      {
        authenticatorType !== GoogleType && (
          <p>The one time password Phone (SMS) option has been turned on.</p>
        )
      }
      
      <div className="d-flex dApp-request-btn">
        <Link href="/auth/login" passHref>
          <a href="#" className="btn bttn-primary">
            SIGN IN NOW
          </a>
        </Link>
      </div>
    </>
  );
};

export default Activated2faComponent;
