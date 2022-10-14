import React from "react";
import styles from "./SharedPost.module.css";

interface ShareButtonProps {
  icon: JSX.Element;
  label: string;
}

const ShareButton = ({ icon, label }: ShareButtonProps) => {
  return (
    <button className={styles.shareButton}>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default ShareButton;
