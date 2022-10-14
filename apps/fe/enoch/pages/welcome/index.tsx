import React from "react";
import WelcomeUser from "../../src/components/app/OnboardingComponents/WelcomeUser";
import LoggedInUser from "../../src/components/core/components/LoggedInUser";

const index = () => {
  return <LoggedInUser><WelcomeUser /></LoggedInUser>;
};

export default index;
