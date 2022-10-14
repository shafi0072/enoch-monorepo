import SubscribePage from "../../../../src/components/app/OnboardingComponents/OnBoardingSuggestionComponent/Subscribe";
import LoggedInUser from "../../../../src/components/core/components/LoggedInUser";

const Subscribe: React.FC = (props) => <LoggedInUser><SubscribePage {...props} /></LoggedInUser>;

export default Subscribe;
