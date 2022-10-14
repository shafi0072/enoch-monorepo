import { FC } from "react";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";
import OnBoardingLoading from "../../app/OnboardingComponents/OnBoardingLoading/OnBoardingLoading";

const LoggedInUser: FC = ({ children }: any) => {
  const { isLoading } = useIsLoggedIn();
  if (isLoading) {
    return <OnBoardingLoading/>
  }
  return children
};

export default LoggedInUser;
