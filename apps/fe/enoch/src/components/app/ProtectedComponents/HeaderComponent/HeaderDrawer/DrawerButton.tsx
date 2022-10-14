import React from "react";
import DrawerStyles from "./Drawer.module.css";

interface DrawerButtonProps {
  image: string;
  label: string;
  onClick?: () => void;
}

const DrawerButton = ({ image, label, onClick }: DrawerButtonProps) => {
  return (
    <button onClick={onClick} className={DrawerStyles.drawerButton}>
      <div>
        <img src={image} alt="" className="img-fluid" />
      </div>
      <span>{label}</span>
    </button>
  );
};

export default DrawerButton;
