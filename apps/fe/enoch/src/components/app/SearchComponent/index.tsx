import React, { useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";
import PostService from "../../../services/PostService";
import Header from "../ProtectedComponents/HeaderComponent";
import UserList from "./UserList";
import styles from "./Search.module.css";
import { useForm } from "react-hook-form";

export interface UserType {
  avater: string;
  firstName: string;
  lastName: string;
  _id: string;
  __typename: string;
  username: string;
}

const SearchComponent = () => {
  const [notFound, setNotFound] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const {
    register,
    handleSubmit: bindOnSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmit: any = useCallback(
    async (data: { searchTerm: string }) => {
      const res = await PostService.fetchUsersFromMention(data.searchTerm);
      setUsers(res);
      if (res) setNotFound(true);
    },
    []
  );

  return (
    <div className="dashboard-body-bg second-body-bg">
      <Header />
      <div className="container my-2">
        <div className="row">
          <div className="col-md-6">
            <form action="" onSubmit={bindOnSubmit(handleSubmit)}>
              <div className={styles.inputBox}>
                <FiSearch size={18} color="#8A9099" />
                <input
                  placeholder="Search people"
                  {...register("searchTerm", { required: true })}
                />
              </div>
              {errors.searchTerm && <span>This field is required</span>}
            </form>
            <UserList {...{ users, notFound }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
