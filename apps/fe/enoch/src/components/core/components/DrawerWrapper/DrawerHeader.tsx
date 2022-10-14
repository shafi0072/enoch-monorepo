import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import styles from "./Drawer.module.css";

interface DrawerHeaderProps {
  headerChildren: React.ReactNode;
}

const DrawerHeader = ({ headerChildren }: DrawerHeaderProps) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-between ${styles.drawerHeader}`}
    >
      <MdKeyboardArrowLeft size={28} />
      <div>{headerChildren}</div>
    </div>
  );
};

export default DrawerHeader;
