import React from "react";
import styles from "./Post.module.css";

interface PostDropdownButtonProps {
  icon: JSX.Element;
  label: string;
  description?: string;
  onClick?: () => void;
}

const PostDropdownButton = ({
  icon,
  label,
  description,
  onClick,
}: PostDropdownButtonProps) => {
  return (
    <button onClick={onClick} className={styles.postDropdownButton}>
      <span>{icon}</span>
      <div className={styles.postDropdownButtonText}>
        <span className={styles.postDropdownButtonLabel}>{label}</span>
        {description && (
          <span className={styles.postDropdownButtonDescp}>{description}</span>
        )}
      </div>
    </button>
  );
};

export default PostDropdownButton;
