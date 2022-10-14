import React from "react";
import styles from "./ProfileStats.module.css";

interface StatInfoProps {
  count: number;
  description: string;
}

const StatInfo = ({ count, description }: StatInfoProps) => {
  return (
    <div className={styles.statInfoContainer}>
      <h1>{count}</h1>
      <p>{description}</p>
    </div>
  );
};

export default StatInfo;
