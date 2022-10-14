import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import styles from "./DropdownWithIcon.module.css";

interface Option {
  value: string;
  label: string;
  icon?: JSX.Element | string;
}

interface DropdownWithIconProps {
  options: Array<Option>;
  onChange: (value: string) => void;
  className?: string;
}

export const DropdownWithIcon = ({
  options,
  onChange,
  className,
}: DropdownWithIconProps) => {
  const [defaultValue, setdefaultValue] = useState(options[0].value);
  const [dropdown, setdropdown] = useState(false);
  const [icon, seticon] = useState<any>(options[0].icon);

  const handleOptionsdrop = () => {
    setdropdown(!dropdown);
  };

  const handleOption = (value: string, icon: any) => {
    setdefaultValue(value);
    setdropdown(false);
    seticon(icon);
    onChange(value);
  };
  return (
    <div className={styles.customSelect}>
      <div
        onClick={handleOptionsdrop}
        className={`${styles.customSelectDefaultValue} ${className}`}
      >
        <span className="d-flex gap-1 align-items-center">
          {/* checking iconImgUrl is an image url */}
          {typeof icon === "string" ? (
            <img src={icon} alt="" className={styles.customSelectImage} />
          ) : (
            icon
          )}
          {defaultValue}
        </span>
        {dropdown ? (
          <MdOutlineKeyboardArrowUp size={20} />
        ) : (
          <MdOutlineKeyboardArrowDown size={20} />
        )}
      </div>
      <div
        className={`${
          dropdown ? styles.customSelectDropdown : styles.customSelectdropClose
        }`}
      >
        {options.map((item, index) => (
          <div
            className={styles.customSelectOption}
            key={index}
            onClick={() => handleOption(item.value, item.icon)}
          >
            {typeof item.icon === "string" ? (
              <img
                src={item.icon}
                alt=""
                className={styles.customSelectImage}
              />
            ) : (
              item.icon
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
