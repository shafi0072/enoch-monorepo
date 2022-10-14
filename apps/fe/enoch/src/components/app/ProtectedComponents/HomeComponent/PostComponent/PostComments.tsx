import React, { useCallback, useContext, useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import PostService from "../../../../../services/PostService";
import ToastService from "../../../../../services/ToastService";
import CommentInput from "./CommentInput";
import CommentsList from "./CommentsList";
import styles from "./Post.module.css";
import { PostContext } from "./PostContext";

interface PostCommentProps {
  postId: string;
  followers: number;
}

function PostComments({ postId, followers }: PostCommentProps) {
  const [commentLimit, setcommentLimit] = useState(5);
  const { addPostComment, commentsData }: any = useContext(PostContext);

  return (
    <div className={styles.postCommentsContainer}>
      <CommentInput {...{ postId, addPostComment }} />
      <CommentsList
        {...{
          followers,
          postId,
          commentLimit,
        }}
      />
      {commentsData.length >= 5 && (
        <button
          onClick={() => setcommentLimit((c) => c + 2)}
          className="d-flex align-items-center gap-1 border-0 bg-transparent font-poppins"
        >
          <RiArrowDownSFill />
          <span>Show more</span>
        </button>
      )}
    </div>
  );
}

export default PostComments;
