import { SetStateAction, Dispatch, useState, useCallback } from "react";
import {
  AccountType,
  OnBoardingScreen,
} from "../../../../constants/onboarding-enums";
import AuthService from "../../../../services/AuthService";
import onboardingService from "../../../../services/onboardingService";

const accountTypeArray = [
  {
    title: AccountType.Individual,
    parah:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: AccountType.Business,
    parah:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
interface UserTypeProps {
  setUserTypeView: Dispatch<SetStateAction<boolean>>;
}

const UserType = ({ setUserTypeView }: UserTypeProps) => {
  const [accountType, setAccountType] = useState<string>(AccountType.Business);

  const handleSetAccoutType = useCallback(async () => {
    const response = await onboardingService.addOnboardingInformation({
      accountType,
      activeOnBoardingScreen: OnBoardingScreen.FillPersonalInformation,
    });
    if (response) {
      AuthService.updateUser(response?.data?.addOnboardingDetails ?? {});
      setUserTypeView(false);
    }
  }, [accountType]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="onboarding-new-container container-bg2">
          <div className="onboard-individual-body">
            <div className="onboard-business-logo">
              <img
                src="/images/businessNewLogo.png"
                className="img-fluid"
                alt="logo"
              />
            </div>
            <div className="onboard-business-bottm-img">
              <img
                src="/images/business-img.png"
                className="img-fluid"
                alt="logo"
              />
            </div>
            <div className="onboard-individual-innerbody">
              <h2>Personalize your experience</h2>
              <p>What are you going to use Enoch for?</p>
              <ul>
                {accountTypeArray.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setAccountType(item.title)}
                    className={
                      accountType === item.title
                        ? "border-blue mb-3"
                        : "border-orng mb-3"
                    }
                  >
                    <div className="onboard-business-look">
                      <h3>{item.title}</h3>
                      <p>{item.parah}</p>
                    </div>
                    {accountType === item.title && (
                      <div className="onboard-tick">
                        <img
                          src="/images/business-tick.png"
                          className="img-fluid"
                          alt="tick"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="onboard-busines-nxt">
              <button
                onClick={handleSetAccoutType}
                className="bunsinss-nxt-bttn"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserType;
