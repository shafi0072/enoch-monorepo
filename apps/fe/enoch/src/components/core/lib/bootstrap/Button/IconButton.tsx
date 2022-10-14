import React from "react";
import styles from "../ComponentClasses.module.css";

interface IconButtonProps {
  icon?: JSX.Element;
  onClick?: () => void;
  bgColor?: string;
}

const IconButton = ({
  icon,
  onClick,
  bgColor = "#7521E2",
}: IconButtonProps) => {
  return (
    <button
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
      className={`${styles.iconButton}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
