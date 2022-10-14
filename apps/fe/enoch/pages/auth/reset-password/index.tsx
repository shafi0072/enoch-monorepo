import { NextPage } from "next";
import React, { useState } from "react";
import NewPassword from "../../../src/components/app/AuthComponents/PasswordRecovery/NewPassword";
import PasswordResetConfirmation from "../../../src/components/app/AuthComponents/PasswordRecovery/PasswordResetConfirmation";
import Tab from "../../../src/components/core/components/Tab";

const ResetPassword: NextPage = () => {
  const [activeComponent, setActiveComponent] = useState<string>("newpassword");

  return (
    <>
      <Tab {...{ activeComponent, tabName: "newpassword" }}>
        <NewPassword setActiveComponent={setActiveComponent} />
      </Tab>
      <Tab
        {...{
          activeComponent,
          tabName: "passwordresetconfirmation",
        }}
      >
        <PasswordResetConfirmation />
      </Tab>
    </>
  );
};

export default ResetPassword;
