import React from "react";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { MdOutlineCake, MdOutlineLocationOn } from "react-icons/md";
import { RiHeartAddLine } from "react-icons/ri";
import { BsGenderAmbiguous } from "react-icons/bs";
import styles from "./ProfileInfo.module.css";
import ProfileBadge from "./ProfileBadge";

const ProfileData = () => {
  return (
    <div className={styles.profileInfoInfo}>
      <div className={`${styles.profileInfoHeader} border-bottom`}>
        <h1>@Hulk</h1>
        <p>
          5000 inspired generative NFTs Monkey Enoch: http://enoch.app/hulk66
        </p>
      </div>
      <div className={`${styles.profileInfoBadges} border-bottom`}>
        <ProfileBadge
          icon={<MdOutlineLocationOn size={22} color="#8A9099" />}
          label="United Kingdom"
        />
        <ProfileBadge
          icon={<HiOutlineGlobeAlt size={22} color="#8A9099" />}
          label="Not available"
        />
        <ProfileBadge
          icon={<FiCalendar size={22} color="#8A9099" />}
          label="Joined July 2021"
        />
        <ProfileBadge
          icon={<MdOutlineCake size={22} color="#8A9099" />}
          label="Not available"
        />
        <ProfileBadge
          icon={<BsGenderAmbiguous size={22} color="#8A9099" />}
          label="Male"
        />
        <ProfileBadge
          icon={<RiHeartAddLine size={22} color="#8A9099" />}
          label="Committed"
        />
      </div>
    </div>
  );
};

export default ProfileData;
