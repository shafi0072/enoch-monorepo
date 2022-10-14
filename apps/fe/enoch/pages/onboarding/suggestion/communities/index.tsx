import CommunitiesPage from "../../../../src/components/app/OnboardingComponents/OnBoardingSuggestionComponent/Communities";
import LoggedInUser from "../../../../src/components/core/components/LoggedInUser";

const Communities: React.FC = (props) => (
  <LoggedInUser>
    <CommunitiesPage {...props} />
  </LoggedInUser>
);

export default Communities;
