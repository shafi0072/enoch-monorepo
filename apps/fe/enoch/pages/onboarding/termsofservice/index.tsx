import React from "react";
import TermsOfService from "../../../src/components/app/OnboardingComponents/OnBoardingComponent/TermsOfService/TermsOfService";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";

const TermsOfServicePage = () => {
  return (
    <LoggedInUser>
      <TermsOfService />
    </LoggedInUser>
  );
};

export default TermsOfServicePage;
