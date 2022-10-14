import { useRouter } from "next/router";
import React, { useState } from "react";
import Activated2faComponent from "../../../src/components/app/AuthComponents/Activated2faComponent";
import NewPhoneNumber from "../../../src/components/app/AuthComponents/ChangePhoneNumber/NewPhoneNumber";
import ValidatePhoneNumber from "../../../src/components/app/AuthComponents/ChangePhoneNumber/ValidatePhoneNumber";
import RequestSmsOtp from "../../../src/components/app/AuthComponents/RequestSmsOtp";
import VerifySmsOtpComponent from "../../../src/components/app/AuthComponents/VerifyOtpComponent";
import AboutEnoch from "../../../src/components/core/components/AboutEnoch";
import { Modal } from "../../../src/components/core/components/Modal";
import Tab from "../../../src/components/core/components/Tab";
import { TwoFactorAuthStages } from "../../../src/constants/two-factor-auth";

const RequestSmsOtpPage = () => {
  const router = useRouter();
  const [twoFactorAuthStage, setTwoFactorAuthStage] = useState(() => {
    if (router.query?.twoFactorAuthStage) {
      return router.query?.twoFactorAuthStage;
    } else {
      return TwoFactorAuthStages.enterOTP;
    }
  });
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] = useState<string>(
    "VALIDATE_OTP"
  );
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="confirm-email-form">
              <AboutEnoch />
              {twoFactorAuthStage === TwoFactorAuthStages.enterOTP && (
                <RequestSmsOtp
                  setisOpen={setisOpen}
                  setTwoFactorAuthStage={setTwoFactorAuthStage}
                />
              )}
              {twoFactorAuthStage === TwoFactorAuthStages.verifyOTP && (
                <VerifySmsOtpComponent
                  setTwoFactorAuthStage={setTwoFactorAuthStage}
                  setisOpen={setisOpen}
                />
              )}
              {twoFactorAuthStage ===
                TwoFactorAuthStages.twoFactorActivated && (
                <Activated2faComponent />
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen}>
          <Tab
            {...{
              activeComponent,
              tabName: "VALIDATE_OTP"
            }}
          >
            <ValidatePhoneNumber
              setActiveComponent={setActiveComponent}
              onClose={() => setisOpen(false)}
            />
          </Tab>
          <Tab
            {...{
              activeComponent,
              tabName: "NEW_PHONE_NUMBER"
            }}
          >
            <NewPhoneNumber onClose={() => setisOpen(false)} />
          </Tab>
        </Modal>
      )}
    </section>
  );
};

export default RequestSmsOtpPage;
