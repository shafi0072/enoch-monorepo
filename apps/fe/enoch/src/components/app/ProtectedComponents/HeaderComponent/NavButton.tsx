import React, { useState } from "react";
import Link from "next/link";
import HeaderStyles from "./Header.module.css";

interface NavButtonProps {
  label?: string;
  icon?: JSX.Element;
  bgColor?: string;
  textColor?: string;
  messagePop?: boolean;
  messageCount?: number;
  value?: number;
  onClick?: () => void;
  extraIcon?: JSX.Element;
}

const NavButton = ({
  extraIcon,
  label,
  icon,
  bgColor = "white",
  textColor = "black",
  messagePop = false,
  value = 0,
  onClick,
}: NavButtonProps) => {
  return (
    <button
      className={HeaderStyles.navButton}
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      <span className={HeaderStyles.messagePop}>
        {icon && icon}
        {messagePop && (
          <span
            className={HeaderStyles.messageCount}
            style={{
              backgroundColor: `${value > 0 ? "#F03B31" : "#D4D8DD"}`,
            }}
          >
            {value}
          </span>
        )}
      </span>
      {label && <span>{label}</span>}
      {extraIcon && extraIcon}
    </button>
  );
};

export default NavButton;
