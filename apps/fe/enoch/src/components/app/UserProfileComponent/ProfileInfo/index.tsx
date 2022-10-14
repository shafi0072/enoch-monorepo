import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import IconButton from "../../../core/lib/bootstrap/Button/IconButton";
import AvatarBg from "../../OnboardingComponents/AvatarBgComponent";
import ProfileData from "./ProfileData";
import ProfileForm from "./ProfileForm";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  const [profileFormOpen, setprofileFormOpen] = useState<boolean>(false);
  const [chooseAvatarPop, setchooseAvatarPop] = useState<boolean>(false);
  return (
    <div className={styles.profileInfoContainer}>
      {chooseAvatarPop && (
        <div
          style={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            overflowX: "hidden",
          }}
        >
          <AvatarBg handleClose={() => setchooseAvatarPop(false)} />
        </div>
      )}
      <div>
        <div className={styles.profileInfoImage}>
          <img src="/images/userAvtar/changeImg-bg1.png" alt="" />
          <div>
            <div className={styles.profileInfoAvatar}>
              <img src="/images/userAvtar/use-ava-img111.png" alt="" />
              <div className={styles.profileInfouserAvatar}>
                <img src="/images/userAvtar/user-Av6.png" alt="" />
              </div>
              <h3>Hulk</h3>
              <p>Superbase</p>
              {profileFormOpen && (
                <div
                  className={styles.profileInfoOverlay}
                  onClick={() => setchooseAvatarPop(true)}
                >
                  <IconButton
                    onClick={() => setprofileFormOpen(true)}
                    icon={<FaPen size={18} />}
                  />
                </div>
              )}
            </div>
          </div>
          {profileFormOpen && (
            <button
              className={styles.profileInfoChangeBackground}
              onClick={() => setchooseAvatarPop(true)}
            >
              <RiImageEditFill color="#d4d8dd" size={20} />
              <span>Change Background Image</span>
            </button>
          )}
          {!profileFormOpen && (
            <div className={styles.profileEditIcon}>
              <IconButton
                onClick={() => setprofileFormOpen(true)}
                icon={<FaPen size={18} />}
              />
            </div>
          )}
        </div>
      </div>
      {profileFormOpen ? (
        <ProfileForm handleClose={() => setprofileFormOpen(false)} />
      ) : (
        <ProfileData />
      )}
    </div>
  );
};

export default ProfileInfo;
