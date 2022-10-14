import React, { useCallback } from "react";
import ReactPlayer from "react-player/lazy";
import { socialCards } from "../../../../constants/socialCards";
import Footer from "../../../core/components/onboarding/Footer";
import SocialCard from "./SocialCard";
import TakeMeToOnboarding from "./TakeMeToOnboarding";
import UserInfo from "../../../core/components/onboarding/UserInfo";
import { useRouter } from "next/router";
import onboardingService from "../../../../services/onboardingService";
import { OnBoardingScreen } from "../../../../constants/onboarding-enums";
import AuthService from "../../../../services/AuthService";

const InfoComponent = () => {
  const router = useRouter();

  const launchEnoch = useCallback(async () => {
    const response = await onboardingService.addOnboardingInformation({
      activeOnBoardingScreen: OnBoardingScreen.OnboardingCompleted,
    });
    if (!response) return;
    AuthService.updateUser(response?.data?.addOnboardingDetails);
    router.replace("/");
  }, []);
  return (
    <div className="main info-body-img">
      <section>
        <div className="ezl-dashboard-container">
          <div className="video">
            <ReactPlayer
              width={"100%"}
              controls
              url="https://www.youtube.com/watch?v=Oz9zw7-_vhM"
            />
          </div>
          <h1 className="join-heading">Join Enoch | Better.Together</h1>
          <div className="margin-b-25">
            <UserInfo />
          </div>
          <TakeMeToOnboarding />
          <h2 className="community-heading">Join our community</h2>
          <div className="cardset1">
            {socialCards.map((card) => {
              return (
                <SocialCard
                  key={card.media}
                  media={card.media}
                  description={card.description}
                  image={card.image}
                />
              );
            })}
          </div>

          <Footer />
          <div className="mac">
            <button onClick={launchEnoch} className="eno-mac-continue">
              Continue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoComponent;
