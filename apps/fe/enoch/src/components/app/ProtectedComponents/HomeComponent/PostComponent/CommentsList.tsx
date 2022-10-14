import React, { useContext } from "react";
import Comment from "./Comment";
import styles from "./Post.module.css";
import { PostContext } from "./PostContext";

interface Props {
  followers: number;
  postId: any;
  commentLimit: number;
}
const CommentsList = ({ followers, commentLimit, postId }: Props) => {
  const { commentsData, fetchComments }: any = useContext(PostContext);

  React.useEffect(() => {
    fetchComments(postId, commentLimit);
  }, [commentLimit]);
  return (
    <div className={styles.commentListContainer}>
      <h3>Most relavant</h3>
      {commentsData?.map((comment: any) => (
        <Comment {...{ comment, postId }} />
      ))}
    </div>
  );
};

export default CommentsList;
