import React from 'react';
import ChooseAvatarComponent from '../../../src/components/app/OnboardingComponents/ChooseAvatarComponent/ChooseAvatarComponent';
import LoggedInUser from '../../../src/components/core/components/LoggedInUser';

const ChooseAvatar: React.FC = (props) => <LoggedInUser><ChooseAvatarComponent {...props} /></LoggedInUser>

export default ChooseAvatar