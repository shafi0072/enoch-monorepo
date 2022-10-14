import React from "react";
import { User } from "./users";

interface Props {
  reaction: User;
}
const ProfileCard = ({ reaction: { imageURL, shortDes, name } }: Props) => {
  return (
    <li>
      <span>
        <img src={imageURL} alt="Touchstone" className="img-fluid" />
        <div className="reaction-icon">
          <img src="/images/rLike.png" className="img-fluid" alt="icon" />
        </div>
      </span>
      <div className="reaction-content-list-right">
        <h4>{name}</h4>
        <p>{shortDes}</p>
      </div>
    </li>
  );
};

export default ProfileCard;
