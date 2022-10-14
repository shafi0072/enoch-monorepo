import SelectIndustry from "../../../src/components/app/OnboardingComponents/OnBoardingComponent/IndustrySelection/SelectIndustry";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";

const SelectIndustryPage:React.FC = (props) => <LoggedInUser><SelectIndustry {...props} /></LoggedInUser>

export default SelectIndustryPage;
