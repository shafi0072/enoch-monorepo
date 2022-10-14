import React from "react";
import styles from "../ComponentClasses.module.css";

interface ButtonProps {
  label: string;
  icon?: JSX.Element;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  width?: any;
  bgColor?: string;
  textColor?: string;
}

const Button = ({
  label,
  icon,
  type = "submit",
  onClick,
  disabled,
  className = "",
  width,
  bgColor,
  textColor = "#6C757D",
}: ButtonProps) => {
  return (
    <button
      style={{ width: width, backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${styles.btnClick} d-flex align-items-center justify-content-center gap-1 border border-2 p-1 px-4 ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
