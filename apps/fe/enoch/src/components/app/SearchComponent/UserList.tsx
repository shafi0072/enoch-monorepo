import React from "react";
import UserCard from "./UserCard";
import { UserType } from "./index";

interface Props {
  users: UserType[];
  notFound: boolean;
}
const UserList = ({ users, notFound }: Props) => (
  <>
    {users?.length ? (
      <div className="home-post-mid-show-more-content pb-4">
        <div className="bg-white You-might-like-follow-list">
          <ul>
            {users.map((user: UserType) => (
              <UserCard key={user._id} {...{ user }} />
            ))}
          </ul>
        </div>
      </div>
    ) : null}

    {notFound && !users?.length && (
      <div className="home-post-mid-show-more-content pb-4">
        <h1>Not found</h1>
      </div>
    )}
  </>
);

export default UserList;
