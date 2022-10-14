import React, { useState } from "react";
import ReactionTab from "./ReactionTab";
import Tab from "../../../../core/components/Tab";
import { User, users } from "./users";
import ReactionBody from "./ReactionBody";

const index = () => {
  const [activeComponent, setActiveComponent] = useState<string>("like");

  const handleActiveComponent = (str: string) => {
    setActiveComponent(str);
  };

  const filterUser = (arrOfUser: any, keyword: string) => {
    const filtered = arrOfUser.filter((user: User) => {
      if (user.reaction === keyword) {
        return user;
      }
    });
    return filtered;
  };

  return (
    <div className="modal-content user-reaction-modal-content">
      <span className="close">
        <img
          src="/images/hCross.png"
          alt="close"
          className="img-fluid"
          data-dismiss="modal"
        />
      </span>
      <h3>Reactions </h3>
      <div className="user-reaction-hd-img">
        <img
          src="/images/reaction-head.png"
          className="img-fluid w-100"
          alt="reaction"
        />
      </div>
      <div className="modal-body user-reaction-modal-body">
        <ReactionTab {...{ handleActiveComponent, activeComponent }} />

        <Tab {...{ activeComponent, tabName: "like" }}>
          <ReactionBody {...{ users, filterUser, react: "like" }} />
        </Tab>
        <Tab {...{ activeComponent, tabName: "love" }}>
          <ReactionBody {...{ users, filterUser, react: "love" }} />
        </Tab>
        <Tab {...{ activeComponent, tabName: "support" }}>
          <ReactionBody {...{ users, filterUser, react: "support" }} />
        </Tab>
      </div>
    </div>
  );
};

export default index;
