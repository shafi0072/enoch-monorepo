import React from "react";
import parse from "html-react-parser";
import styles from "./Post.module.css";

const RepliedComment = ({ reply, setcommentDropdown, likeOnComment }: any) => {
  const {
    text,
    repliesCount,
    _id,
    user: { avater, username },
  } = reply;

  return (
    <>
      <div key={_id} className={styles.commentContainer}>
        <div className={styles.commentImg}>
          <img
            src="/images/userAvtar/user-Av4.png"
            alt=""
            className="img-fluid"
          />
        </div>
        <div>
          <div className={styles.commentData}>
            <h1 className={styles.commentDataHead}>@{username}</h1>
            <div className={styles.commentDataFollowers}>912 followers</div>
            <p className={styles.commentDatacomment}>{parse(text)}</p>
          </div>
          <div className={styles.commentDataBtns}>
            <button className={styles.commentDataLikeBtn}>Like</button>
            <button
              onClick={() => setcommentDropdown((prev: any) => !prev)}
              className={styles.commentDataReplyBtn}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepliedComment;
