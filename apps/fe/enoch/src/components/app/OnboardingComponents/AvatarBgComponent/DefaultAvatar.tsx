import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./AvatarBg.module.css";
import { Button } from "../../../core";
import { rpgAvatarImages } from "./imageData";

interface DefaultAvatarProps {
  avatar: string;
  setavatar: Dispatch<SetStateAction<string>>;
}

const avatarOptionsList = ["rpg", "apocalypse", "alien"];

const avatarType = {
  AVATAROPTION: "rpg",
  CUSTOM: "custom",
};

const DefaultAvatar = ({ avatar, setavatar }: DefaultAvatarProps) => {
  const [activeAvatarOption, setactiveAvatarOption] = useState(
    avatarType.AVATAROPTION
  );

  return (
    <div className={styles.defaultAvatarContainer}>
      <div className={styles.defaultAvatarOptions}>
        {avatarOptionsList.map((item, index) => (
          <Button
            key={index}
            type="button"
            text={item + " avatar"}
            className={
              activeAvatarOption === item
                ? styles.defaultAvatarBtnActive
                : styles.defaultAvatarBtn
            }
            handler={() => setactiveAvatarOption(item)}
          />
        ))}
      </div>
      {/* default avatar content */}
      <div className={styles.defaultAvatarImgBox}>
        {/* main image */}
        <div className={styles.defaultAvatarMainImg}>
          <img src="/images/userAvtar/use-ava-img111.png" alt="" />
          <div className={styles.setCardImage}>
            <img src={avatar} alt="" />
          </div>
        </div>
        {/* avatar options */}
        <div className={styles.defaultAvatarImgOptions}>
          {rpgAvatarImages.map((image, index) => (
            <div key={index}>
              <img
                onClick={() => setavatar(image)}
                src={image}
                key={index}
                alt=""
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultAvatar;
