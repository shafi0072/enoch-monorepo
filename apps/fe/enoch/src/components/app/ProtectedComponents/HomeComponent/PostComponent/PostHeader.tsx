import { format } from "date-fns";
import React, { useState } from "react";
import { FiClock } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import styles from "./Post.module.css";
import PostDropdown from "./PostDropdown";

interface PostHeaderProps {
  createdAt: string;
  userInfo: any;
}

const defaultAvatar = "/images/userAvtar/user-Av4.png";

const PostHeader = ({ createdAt, userInfo }: PostHeaderProps) => {
  const [postHeaderdrop, setpostHeaderdrop] = useState<boolean>(false);

  const getDefaultAvatar = (user: any) => user.avatar || defaultAvatar;

  return (
    <div className={styles.postHeader}>
      <div className={styles.postHeaderImg}>
        <img src={getDefaultAvatar(userInfo)} alt="" className="img-fluid" />
      </div>
      <div className="flex-grow-1">
        <h1 className={styles.postHeaderName}>@{userInfo.username}</h1>
        <h2 className={styles.postHeaderDesc}>
          5000 inspired generative NFTs Monkey Enoch
        </h2>
        <div className={styles.postHeaderDate}>
          <FiClock />
          <span>{format(new Date(Number(createdAt)), "MM yyyy")}</span>
        </div>
      </div>
      <div
        onClick={() => setpostHeaderdrop(!postHeaderdrop)}
        className={styles.postHeaderDotIcon}
      >
        <HiDotsHorizontal size={25} />
        {postHeaderdrop && (
          <div onClick={(e) => e.stopPropagation()}>
            <PostDropdown name="Hulk" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
