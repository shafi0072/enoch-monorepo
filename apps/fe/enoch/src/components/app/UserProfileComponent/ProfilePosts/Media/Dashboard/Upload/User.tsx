import React from "react";

interface Props {
  user: any;
  addSelectUser(obj: object): void;
}
const User = ({ user, addSelectUser }: Props) => {
  return (
    <>
      <li
        key={user.id}
        onClick={() => addSelectUser(user)}
        className="media_avex_SearchFull__list__item"
      >
        <img
          src="/images/Ellipse_hlvin.png"
          alt="User"
          className="media_avex_SearchFull__list__img w-25"
        />
        <div className="media_avex_SearchFull__list__detail">
          <h4 className="magicSearch__list__name">{user.name}</h4>
        </div>
      </li>
    </>
  );
};

export default User;
