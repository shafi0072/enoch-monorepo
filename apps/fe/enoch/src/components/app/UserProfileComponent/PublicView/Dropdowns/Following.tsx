import React from "react";

interface Props {
  handleDropdownClick: (menuName: string) => void;
}

interface DataTypes {
  TITLE: string;
  MESSAGE: string;
  CANCEL: string;
  FOLLOWING: string;
  UNFOLLOW: string;
}

const data: DataTypes = {
  TITLE: "Unfollow @Alvaro Stats",
  MESSAGE:
    "Their Tweets will no longer show up in your home timeline. You can still view their profile, unless theit Tweets are protected",
  CANCEL: "Cancel",
  FOLLOWING: "Following",
  UNFOLLOW: "Unfollow",
};

const Following = ({ handleDropdownClick }: Props) => (
  <div className="public-user-view followng op-follow-btn-content">
    <h3>{data.TITLE}</h3>
    <p>{data.MESSAGE}</p>
    <div className="OP-unfollow-btn">
      <button className="Cancel">
        <a onClick={() => handleDropdownClick("")}>{data.CANCEL}</a>
      </button>
      <button className="Unfollow text-white">
        <a>{data.UNFOLLOW}</a>
      </button>
    </div>
  </div>
);
export default Following;
