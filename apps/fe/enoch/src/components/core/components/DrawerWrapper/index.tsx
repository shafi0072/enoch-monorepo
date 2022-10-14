import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerHeader from "./DrawerHeader";
import styles from "./Drawer.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface DrawerWrapperProps {
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  direction?: "right" | "left" | "top" | "bottom";
  size?: number;
  className?: string;
  setPage?: any;
  activePage?: any;
  indexTab?: string;
}

export const DrawerWrapper = ({
  children,
  isOpen,
  onClose,
  direction = "right",
  size,
  className,
  setPage,
  activePage,
  indexTab,
}: DrawerWrapperProps) => {
  const goBack = () => {
    if (activePage === indexTab) onClose();
    setPage(indexTab);
  };
  return (
    <Drawer
      style={{ zIndex: 9999 }}
      open={isOpen}
      onClose={onClose}
      direction={direction}
      size={size}
      className={`${styles.drawer} ${className}`}
    >
      <div
        className={`d-flex align-items-center justify-content-between ${styles.drawerHeader}`}
      >
        <MdKeyboardArrowLeft size={28} onClick={goBack} />
        {/* <div>{headerChildren}</div> */}
      </div>
      <div className={`${styles.drawerBodyContainer}`}>
        <div className={`${styles.drawerBody}`}>{children}</div>
      </div>
    </Drawer>
  );
};
