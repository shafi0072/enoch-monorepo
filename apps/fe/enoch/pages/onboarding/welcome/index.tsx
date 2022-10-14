import React from "react";
import InfoComponent from "../../../src/components/app/OnboardingComponents/InfoComponent";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";

const WelcomePage = () => {
  return <LoggedInUser><InfoComponent /></LoggedInUser>;
};

export default WelcomePage;
