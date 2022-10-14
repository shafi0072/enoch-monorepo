import { FC, useEffect, useState } from "react";
import SelectAvatar from "./SelectAvatar";
import SelectBackground from "./SelectBackground";
import SelectCard from "./SelectCard";
import styles from "./AvatarBg.module.css";
import { AvatarCardType } from "../../../../constants/onboarding-enums";
import AuthService from "../../../../services/AuthService";

interface AvatarBgProps {
  handleClose?: () => void;
}

const AvatarBg: FC<AvatarBgProps> = ({ handleClose }: AvatarBgProps) => {
  const [page, setpage] = useState<
    "avatarPage" | "cardPage" | "backgroundPage"
  >("avatarPage");
  const [username, setusername] = useState<string>("");
  const [avatar, setavatar] = useState<string>(
    "/images/userAvtar/avatar-default.png"
  );
  const [card, setcard] = useState<AvatarCardType>(AvatarCardType.SILVER);

  const [background, setbackground] = useState<string>(
    "/images/userAvtar/changeImg-bg1.png"
  );
  const [cardTitle, setcardTitle] = useState<string>("");

  return (
    <div
      style={{
        backgroundImage: "url(" + background + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleClose}
      className={styles.avatarBgContainer}
    >
      <div className={styles.avatarBgOverlay}></div>
      {/* main box */}
      <div className={styles.avatarBgBox} onClick={(e) => e.stopPropagation()}>
        {page === "avatarPage" && (
          <SelectAvatar
            {...{ avatar, setavatar, card, setpage, username, setusername }}
          />
        )}
        {page === "cardPage" && (
          <SelectCard
            {...{
              avatar,
              card,
              setcard,
              setpage,
              cardTitle,
              setcardTitle,
              username,
            }}
          />
        )}
        {page === "backgroundPage" && (
          <SelectBackground
            {...{
              background,
              setbackground,
              username,
              avatar,
              card,
              cardTitle,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AvatarBg;
