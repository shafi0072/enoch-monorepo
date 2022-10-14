import React from "react";
import ProfileCard from "./ProfileCard";
import { User } from "./users";

interface Props {
  users: User[];
  react: string;
  filterUser: (arrOfUser: any, keyword: string) => any;
}
const ReactionBody = ({ users, filterUser, react }: Props) => {
  const reacts = filterUser(users, react);
  return (
    <div
      id="rlike"
      className="user-reaction-content-list reaction-content d-block"
    >
      <ul>
        {reacts.map((reaction: User) => (
          <ProfileCard key={reaction.id} {...{ reaction }} />
        ))}
      </ul>
    </div>
  );
};

export default ReactionBody;
