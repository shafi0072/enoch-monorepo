import React, { useCallback } from "react";
import User from "./User";

const users = [
  {
    id: 1,
    name: "@rubikhell",
  },
  {
    id: 2,
    name: "@rohandude",
  },
  {
    id: 3,
    name: "@rxu",
  },
];

interface Props {
  searchTerm: string;
  setSelectedUsers: any;
  selectedUsers: any;
}

const UserList = ({ searchTerm, setSelectedUsers, selectedUsers }: Props) => {
  const addSelectUser = useCallback(
    (user: any) => {
      setSelectedUsers([...selectedUsers, user]);
    },
    [selectedUsers]
  );
  return (
    <>
      <ul className="media_avex_SearchFull__list ">
        {users
          .filter((el) =>
            !el?.name
              ? el
              : el.name
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
          )
          .map((user) => (
            <User {...{ user, addSelectUser }} />
          ))}
      </ul>
    </>
  );
};

export default UserList;
