import OnBoardingIntroComponent from "../../src/components/app/OnboardingComponents/OnBoardingComponent/OnBoardingIntroduction/OnBoardingIntroComponent";
import LoggedInUser from "../../src/components/core/components/LoggedInUser";

const OnBoardingPage: React.FC = (props) => (
  <LoggedInUser>
    <OnBoardingIntroComponent {...props} />
  </LoggedInUser>
);

export default OnBoardingPage;
