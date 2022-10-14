import React, { useState } from "react";
import styles from "./AvatarBg.module.css";
import { Button } from "../../../core";

const CustomAvatar = () => {
  const [customAvatarFound, setcustomAvatarFound] = useState(false);
  return (
    <div className={styles.defaultAvatarContainer}>
      <div className={styles.defaultAvatarOptions}>
        <Button
          type="button"
          text="Enoch Citizen"
          className={styles.defaultAvatarBtnActive}
        />
      </div>
      <div className={styles.customAvatarImgBox}>
        <div>
          {customAvatarFound ? (
            <div>Found</div>
          ) : (
            <div className={styles.customAvatarSearch}>
              <h4>Searching centralized wallet for avatar.</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomAvatar;
