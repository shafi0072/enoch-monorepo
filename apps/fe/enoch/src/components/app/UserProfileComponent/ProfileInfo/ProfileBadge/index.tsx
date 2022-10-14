import React from "react";
import styles from "./ProfileBadge.module.css";

interface ProfileBadgeProps {
  icon?: JSX.Element;
  label?: string;
}

const ProfileBadge = ({ icon, label }: ProfileBadgeProps) => {
  return (
    <div
      style={{ fontFamily: "Poppins", fontSize: "14px" }}
      className="d-flex gap-2 align-items-center p-1 px-2"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default ProfileBadge;
