import React, { useState, useCallback, useContext } from "react";
import parse from "html-react-parser";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import CommentInput from "./CommentInput";
import styles from "./Post.module.css";
import PostService from "../../../../../services/PostService";
import { PostContext } from "./PostContext";
import RepliedComment from "./RepliedComment";
import ToastService from "../../../../../services/ToastService";
import LikeCounts from "./LikeCounts";

interface Props {
  comment: any;
  postId: string;
}
const Comment = ({ comment, postId }: Props) => {
  const [commentDropdown, setcommentDropdown] = useState<boolean>(false);
  const { fetchCommentReplies, likeOnComment }: any = useContext(PostContext);
  const [replies, setReplies] = useState<any>([]);
  const [seeReplies, setSeeReplies] = useState<boolean>(true);
  const [isLike, setIsLike] = useState<boolean>(false);
  const {
    text,
    repliesCount,
    _id,
    likeCount,
    user: { username },
  } = comment;
  const [likes, setLikes] = useState(likeCount);

  const fetchReplies = useCallback(async () => {
    const replies = await fetchCommentReplies(_id, postId);
    setReplies(replies);
    showReplies();
  }, [replies]);

  const showReplies = useCallback(() => {
    setSeeReplies(false);
  }, [seeReplies]);

  const hideReplies = useCallback(() => {
    setSeeReplies(true);
    setReplies([]);
  }, [seeReplies]);

  const likeHandler = useCallback(async () => {
    const res = await likeOnComment(postId, _id);
    if (res) {
      setIsLike(true);
      setLikes((prev: any) => prev + 1);
    }
  }, []);

  const addCommentOnReply = async (obj: any, id: string) => {
    try {
      const res: any = await PostService.addPostComment(id, {
        text: obj?.comment,
        parentId: obj?.parentId,
      });
      setReplies([res.data.addComment, ...replies]);
    } catch (err: any) {
      ToastService.error(err.message);
    }
  };

  return (
    <div key={_id} className={styles.commentContainer}>
      <div className={styles.commentImg}>
        <img
          src="/images/userAvtar/user-Av4.png"
          alt=""
          className="img-fluid"
        />
      </div>
      <div className="w-100">
        <div style={{ position: "relative" }} className={styles.commentData}>
          <h1 className={styles.commentDataHead}>@{username}</h1>
          <div className={styles.commentDataFollowers}>912 followers</div>
          <p className={styles.commentDatacomment}>{parse(text)}</p>
          {likes ? <LikeCounts {...{ likeCount: likes }} /> : null}
        </div>

        <div className={styles.commentDataBtns}>
          {isLike ? (
            <button className={styles.commentDataLikeBtn}>Unlike</button>
          ) : (
            <button onClick={likeHandler} className={styles.commentDataLikeBtn}>
              Like
            </button>
          )}

          <button
            onClick={() => {
              setcommentDropdown(!commentDropdown);
            }}
            className={styles.commentDataReplyBtn}
          >
            Reply
          </button>
        </div>
        {repliesCount ? (
          <>
            {seeReplies ? (
              <p className="font-poppins fw-600 ml-2" onClick={fetchReplies}>
                See {repliesCount} Replies <RiArrowDownSFill />
              </p>
            ) : (
              <p className="font-poppins fw-600 ml-2" onClick={hideReplies}>
                Hide {repliesCount} Replies <RiArrowUpSFill />
              </p>
            )}
          </>
        ) : null}
        {replies.map((reply: any) => (
          <RepliedComment {...{ reply, setcommentDropdown, postId }} />
        ))}
        <div className="py-2">
          {commentDropdown && (
            <CommentInput
              {...{
                parentId: _id,
                addPostComment: addCommentOnReply,
                postId,
                user: `@${username}`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
