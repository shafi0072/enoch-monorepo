import React, { Dispatch, SetStateAction } from "react";
import styles from "./AvatarBg.module.css";
import { HiChevronDoubleRight } from "react-icons/hi";
import { Button } from "../../../core";
import { mergeClassNames } from "../../../../utils/index";
import { AvatarCardType } from "../../../../constants/onboarding-enums";

interface SelectCardProps {
  avatar: string;
  card: AvatarCardType;
  setcard: Dispatch<SetStateAction<AvatarCardType>>;
  setpage: Dispatch<
    SetStateAction<"avatarPage" | "cardPage" | "backgroundPage">
  >;
  cardTitle: string;
  setcardTitle: Dispatch<SetStateAction<string>>;
  username: string;
}

const SelectCard = ({
  avatar,
  card,
  setcard,
  setpage,
  cardTitle,
  setcardTitle,
  username,
}: SelectCardProps) => {
  const handlePage = () => {
    setpage("backgroundPage");
  };
  return (
    <div className={styles.selectCardContainer}>
      <div className={styles.selectCardHeader}>
        <h1>Select your card</h1>
        <p>Click to select the card.</p>
      </div>
      <div className={styles.selectCardImages}>
        <div
          className={
            card === "SILVER"
              ? mergeClassNames([
                  styles.selectCardImgOne,
                  styles.selectCardActive,
                ])
              : styles.selectCardImgOne
          }
          onClick={() => setcard(AvatarCardType.SILVER)}
        >
          <img src="/images/userAvtar/use-ava-img111.png" alt="" />
          <div>
            <img src={avatar} alt="" />
          </div>
          <h4>{username}</h4>
          <input
            placeholder="Card Title...."
            value={cardTitle}
            onChange={(e) => setcardTitle(e.target.value)}
          />
        </div>
        <div
          className={
            card === "GOLD"
              ? mergeClassNames([
                  styles.selectCardImgTwo,
                  styles.selectCardActive,
                ])
              : styles.selectCardImgTwo
          }
          onClick={() => setcard(AvatarCardType.GOLD)}
        >
          <img src="/images/userAvtar/use-ava-img333.png" alt="" />
          <div>
            <img src={avatar} alt="" />
          </div>
          <h4>{username}</h4>
          <input
            placeholder="Card Title...."
            value={cardTitle}
            onChange={(e) => setcardTitle(e.target.value)}
          />
        </div>
        <div
          className={
            card === "DIAMOND"
              ? mergeClassNames([
                  styles.selectCardImgThree,
                  styles.selectCardActive,
                ])
              : styles.selectCardImgThree
          }
          onClick={() => setcard(AvatarCardType.DIAMOND)}
        >
          <img src="/images/userAvtar/use-ava-img222.png" alt="" />
          <div>
            <img src={avatar} alt="" />
          </div>
          <h4>{username}</h4>
          <input
            placeholder="Card Title...."
            value={cardTitle}
            onChange={(e) => setcardTitle(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.selectCardInstructions}>
        <h3>Instructions!</h3>
        <div>
          <div className={styles.selectCardInstruction}>
            <HiChevronDoubleRight />
            <p>Select your choice of card</p>
          </div>
          <div className={styles.selectCardInstruction}>
            <HiChevronDoubleRight />
            <p>Write a title for your card. Max 16 characters.</p>
          </div>
        </div>
      </div>
      <div className={styles.nextButtonContainer}>
        <Button
          type="button"
          disabled={!cardTitle}
          className={styles.nextButton}
          text="Next"
          handler={handlePage}
        />
      </div>
    </div>
  );
};

export default SelectCard;
