import { NextPage } from "next";
import { useState } from "react";
import EmailSentConfirmation from "../../../src/components/app/AuthComponents/PasswordRecovery/EmailSentConfirmation";
import EnterOTP from "../../../src/components/app/AuthComponents/PasswordRecovery/EnterOTP";
import EnterOTPforGoogle from "../../../src/components/app/AuthComponents/PasswordRecovery/EnterOTPforGoogle";
import RecoverPasswordWithEmail from "../../../src/components/app/AuthComponents/PasswordRecovery/RecoverPasswordWithEmail";
import RecoverPasswordWithPhone from "../../../src/components/app/AuthComponents/PasswordRecovery/RecoverPasswordWithPhone";
import Tab from "../../../src/components/core/components/Tab";

const ForgotPassword: NextPage = () => {
  const [activeComponent, setActiveComponent] = useState<string>(
    "recoverpasswordwithemail"
  );
  const [_2FAresponse, set_2FAresponse] = useState<object>({});
  const [email, setEmail] = useState('');

  return (
    <>
      <Tab
        {...{
          activeComponent,
          tabName: "recoverpasswordwithemail",
        }}
      >
        <RecoverPasswordWithEmail
          {...{ setActiveComponent, set_2FAresponse, email, setEmail }}
        />
      </Tab>

      <Tab
        {...{
          activeComponent,
          tabName: "recoverpasswordwithphone",
        }}
      >
        <RecoverPasswordWithPhone {...{ setActiveComponent, _2FAresponse }} />
      </Tab>

      <Tab {...{ activeComponent, tabName: "emailsentconfirmation" }}>
        <EmailSentConfirmation {...{email}}/>
      </Tab>
      <Tab {...{ activeComponent, tabName: "enterOTP" }}>
        <EnterOTP {...{ setActiveComponent, _2FAresponse }} />
      </Tab>

      <Tab {...{ activeComponent, tabName: "enterOTPforGoogle" }}>
        <EnterOTPforGoogle {...{ setActiveComponent, _2FAresponse }} />
      </Tab>
    </>
  );
};

export default ForgotPassword;
