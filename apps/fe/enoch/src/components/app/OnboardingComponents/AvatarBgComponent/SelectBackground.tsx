import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../../core";
import { routes } from "../../../../constants/routes";
import styles from "./AvatarBg.module.css";
import { rpgbackgroundImageList } from "./imageData";
import OnboardingService from "../../../../services/onboardingService";
import {
  AvatarCardType,
  OnBoardingScreen,
} from "../../../../constants/onboarding-enums";
import AuthService from "../../../../services/AuthService";

interface SelectBackgroundProps {
  background: string;
  username: string;
  avatar: string;
  card: AvatarCardType;
  cardTitle: string;
  setbackground: Dispatch<SetStateAction<string>>;
}

const SelectBackground = ({
  background,
  setbackground,
  username,
  avatar,
  card,
  cardTitle,
}: SelectBackgroundProps) => {
  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      username: username,
      avatar: avatar,
      cardType: card,
      avatarTitle: cardTitle,
      backgroundImage: background,
      activeOnBoardingScreen: OnBoardingScreen.AcceptTermsOfService,
    };

    const res = await OnboardingService.addOnboardingInformation({ ...data });
    if (!res) return;
    AuthService.updateUser(res?.data?.addOnboardingDetails ?? {});
    router.replace(routes.onBoardingAcceptTermsAndCondition);
  };
  return (
    <div className={styles.selectBgContainer}>
      <h4>Select Background</h4>
      <div className={styles.selectBgBox}>
        <Button
          type="button"
          text="Enoch citizen Bg"
          className={styles.defaultAvatarBtnActive}
        />
        <div className={styles.selectBgImages}>
          {rpgbackgroundImageList.map((image, index) => (
            <div
              key={index}
              onClick={() => setbackground(image)}
              className={
                background === image
                  ? [styles.selectBgImage, styles.selectBgActive].join(" ")
                  : styles.selectBgImage
              }
            >
              <img src={image} alt="" className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-end pt-3">
        <Button
          type="button"
          text="Finish"
          className={styles.nextButton}
          handler={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SelectBackground;
