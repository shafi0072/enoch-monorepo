import React from "react";
import StatInfo from "./StatInfo";
import styles from "./ProfileStats.module.css";

const ProfileStats = () => {
  return (
    <div className={styles.profileStatsContainer}>
      <div className={styles.profileStatsHeader}>
        <h1>Your Dashbaord</h1>
        <h2>Private to you</h2>
      </div>
      <div className="d-flex justify-content-between pt-3 flex-wrap gap-3">
        {/* count and description */}
        <StatInfo count={771} description="Who viewed your profile" />
        <StatInfo count={1004} description="Post views" />
        <StatInfo count={379} description="Search appearances" />
      </div>
    </div>
  );
};

export default ProfileStats;
