import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import UsernameInput from "./UsernameInput";
import styles from "./AvatarBg.module.css";
import { Button } from "../../../core";
import DefaultAvatar from "./DefaultAvatar";
import CustomAvatar from "./CustomAvatar";
import { AvatarCardType } from "../../../../constants/onboarding-enums";

interface SelectAvatarProps {
  avatar: string;
  card: AvatarCardType;
  username: string;
  setusername: Dispatch<SetStateAction<string>>;
  setavatar: Dispatch<SetStateAction<string>>;
  setpage: Dispatch<
    SetStateAction<"avatarPage" | "cardPage" | "backgroundPage">
  >;
}

const SelectAvatar = ({
  avatar,
  setavatar,
  card,
  setpage,
  username,
  setusername,
}: SelectAvatarProps) => {
  const [defaultAvatarOption, setdefaultAvatarOption] = useState(true);

  const handlePage = () => {
    setpage("cardPage");
  };

  return (
    <div className={styles.avatarContainer}>
      {/* username */}
      <div className={styles.usernameContainer}>
        <div className={styles.usernameHeader}>
          <h1>Username</h1>
        </div>
        <UsernameInput {...{ username, setusername }} />
      </div>
      {/* choose avatar */}
      <div className={styles.avatarBox}>
        <div className={styles.avatarOptions}>
          <Button
            type="button"
            text="Default Avatar"
            className={
              defaultAvatarOption
                ? styles.avatarOptionActive
                : styles.avatarOptionbutton
            }
            handler={() => setdefaultAvatarOption(true)}
          />
          <Button
            type="button"
            text="Custom Avatar"
            className={
              !defaultAvatarOption
                ? styles.avatarOptionActive
                : styles.avatarOptionbutton
            }
            handler={() => setdefaultAvatarOption(false)}
          />
        </div>
        {/* default avatar and custom avatar */}
        <div className={styles.avatarChoose}>
          {defaultAvatarOption ? (
            <DefaultAvatar {...{ avatar, setavatar, card }} />
          ) : (
            <CustomAvatar />
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          disabled={
            !username || avatar === "/images/userAvtar/avatar-default.png"
          }
          type="button"
          text="Next"
          className={styles.nextButton}
          handler={handlePage}
        />
      </div>
    </div>
  );
};

export default SelectAvatar;
