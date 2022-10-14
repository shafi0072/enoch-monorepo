import { FC } from 'react';
import CreateProfileComponent from '../../../src/components/app/OnboardingComponents/CreateProfileComponent/CreateProfileComponent';
import LoggedInUser from '../../../src/components/core/components/LoggedInUser';

const CreateProfile: FC = (props) => <LoggedInUser><CreateProfileComponent {...props} /></LoggedInUser>

export default CreateProfile;