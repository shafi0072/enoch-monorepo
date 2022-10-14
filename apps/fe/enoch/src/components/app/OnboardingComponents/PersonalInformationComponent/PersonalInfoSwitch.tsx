import { useState, FC, useEffect } from "react";
import { OnBoardingScreen } from "../../../../constants/onboarding-enums";
import AuthService from "../../../../services/AuthService";
import UserForm from "./UserForm";
import UserType from "./UserType";

const PersonalInfoSwitch: FC = () => {
  const [isUserTypeView, setUserTypeView] = useState<boolean>(true);
  useEffect(() => {
    const user = AuthService.getUser();
    if (
      user?.activeOnBoardingScreen === OnBoardingScreen.FillPersonalInformation
    ) {
      setUserTypeView(false);
    }
  }, []);

  const View = isUserTypeView ? UserType : UserForm;

  return <View setUserTypeView={setUserTypeView} />;
};

export default PersonalInfoSwitch;
