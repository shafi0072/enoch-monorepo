import SuggestionPage from "../../../src/components/app/OnboardingComponents/OnBoardingSuggestionComponent/Suggestion";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";

const Suggestion: React.FC<any> = (props) => <LoggedInUser><SuggestionPage {...props} /></LoggedInUser>;

export default Suggestion;
