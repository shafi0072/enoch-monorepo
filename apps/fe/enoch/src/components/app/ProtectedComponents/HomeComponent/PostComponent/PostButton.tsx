import React from "react";
import styles from "./Post.module.css";

interface PostButtonProps {
  icon?: any;
  label: string | number;
  image?: string;
  onClick?: () => void;
  className?: string;
  labelView?: boolean;
  onMouseEnter?: any;
  onMouseLeave?: any;
}

const PostButton = ({
  icon,
  label,
  onClick,
  image,
  className = styles.postBtn,
  labelView = false,
}: PostButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {icon ? (
        <span className="d-flex align-items-center">{icon}</span>
      ) : (
        image && <span className="d-flex align-items-center">{image}</span>
      )}
      <span className={labelView ? "" : styles.postLabel}>{label}</span>
    </button>
  );
};

export default PostButton;
