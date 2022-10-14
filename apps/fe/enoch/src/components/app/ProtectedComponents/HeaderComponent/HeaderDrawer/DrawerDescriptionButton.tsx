import React from "react";
import DescriptionStyles from "./Drawer.module.css";

interface DrawerDescriptionButtonProps {
  image: string;
  title: string;
  description: string;
}

const DrawerDescriptionButton = ({
  image,
  title,
  description,
}: DrawerDescriptionButtonProps) => {
  return (
    <div className={DescriptionStyles.descriptionButton}>
      <div className={DescriptionStyles.descriptionImg}>
        <img src={image} alt="" className="img-fluid" />
      </div>
      <div className={DescriptionStyles.descriptionContent}>
        <h3>{title}</h3>
        <div className={DescriptionStyles.descriptionContentDescp}>
          {description}
        </div>
      </div>
    </div>
  );
};

export default DrawerDescriptionButton;
