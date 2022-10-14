import PersonalInfoSwitch from "../../../src/components/app/OnboardingComponents/PersonalInformationComponent/PersonalInfoSwitch";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";

const PersonalInformation:React.FC = (props) => <LoggedInUser><PersonalInfoSwitch {...props} /></LoggedInUser>

export default PersonalInformation