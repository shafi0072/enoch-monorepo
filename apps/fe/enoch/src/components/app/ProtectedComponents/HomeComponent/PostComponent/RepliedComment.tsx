import React, { useCallback, useContext, useState } from "react";
import parse from "html-react-parser";
import styles from "./Post.module.css";
import LikeCounts from "./LikeCounts";
import PostService from "../../../../../services/PostService";
import ToastService from "../../../../../services/ToastService";
import { PostContext } from "./PostContext";

const RepliedComment = ({ reply, setcommentDropdown, postId }: any) => {
  const { likeOnComment }: any = useContext(PostContext);
  const {
    text,
    _id,
    likeCount,
    user: { username },
  } = reply;
  const [likes, setLikes] = useState<number>(likeCount);
  const [isLike, setIsLike] = useState<boolean>(false);

  const likeHandler = useCallback(async () => {
    const res = await likeOnComment(postId, _id);
    if (res) {
      setIsLike(true);
      setLikes((prev: any) => prev + 1);
    }
  }, []);

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
        <div style={{ width: "100%", paddingRight: "0", position: "relative" }}>
          <div className={styles.commentData}>
            <h1 className={styles.commentDataHead}>@{username}</h1>
            <div className={styles.commentDataFollowers}>912 followers</div>
            <p className={styles.commentDatacomment}>{parse(text)}</p>
            {likes ? (
              <LikeCounts {...{ likeCount: likes, bottomStyle: "12px" }} />
            ) : null}
          </div>
          <div className={styles.commentDataBtns}>
            {isLike ? (
              <button className={styles.commentDataLikeBtn}>Unlike</button>
            ) : (
              <button
                onClick={likeHandler}
                className={styles.commentDataLikeBtn}
              >
                Like
              </button>
            )}

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
