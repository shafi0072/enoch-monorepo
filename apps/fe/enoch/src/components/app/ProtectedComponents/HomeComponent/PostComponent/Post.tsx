import React, { useCallback, useContext, useEffect, useState } from "react";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostOpinions from "./PostOpinions";
import styles from "./Post.module.css";
import PostOpinionData from "./PostOpinionData";
import PostComments from "./PostComments";
import { PostContext, PostContextProvider } from "./PostContext";
import Reactions from "./Reactions";

interface Post {
  _id: string;
  type: "Video" | "Image" | "Text" | "Poll";
  content: any;
  commentCounts: number;
  viewsCount: number;
  likeCount: number;
  followers: number;
  isPostComments?: boolean;
  createdAt?: any;
  userInfo?: any;
  mediaResources?: any;
  caption: any;
  user: any;
}
interface PostProps {
  post: Post;
}

const Post = ({ post }: PostProps) => {
  const [showComments, setShowComments] = useState<boolean>(
    post?.isPostComments || false
  );

  const [content, setContent] = useState({
    url: post.mediaResources.length !== 0 ? post.mediaResources[0].url : "",
    ...post,
  });
  const [userInfo, setUserInfo] = useState({
    username: post.user.username,
    avatar: post.user.avatar,
  });

  return (
    <div className={`my-2 ${styles.post}`}>
      <PostContextProvider>
        <PostHeader {...{ createdAt: post.createdAt, userInfo }} />
        <PostContent type={post.type} content={content} />
        <PostOpinionData
          comments={post.commentCounts}
          views={post.viewsCount}
          likes={post.likeCount}
        />
        <PostOpinions
          {...{ showComments, setShowComments, postId: post._id }}
        />
        {showComments && (
          <PostComments
            {...{
              postId: post._id,
              followers: 40,
            }}
          />
        )}
      </PostContextProvider>
    </div>
  );
};

export default Post;
