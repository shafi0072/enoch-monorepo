import { FC } from "react";
import AvatarBg from "../../src/components/app/OnboardingComponents/AvatarBgComponent";
import LoggedInUser from "../../src/components/core/components/LoggedInUser";

const OnboardingProfile: FC = (props) => {
  return <LoggedInUser><AvatarBg {...props} /></LoggedInUser>;
};

export default OnboardingProfile;
