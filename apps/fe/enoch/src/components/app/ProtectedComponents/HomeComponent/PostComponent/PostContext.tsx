import React, { createContext, useCallback, useEffect, useState } from "react";
import PostService from "../../../../../services/PostService";
import ToastService from "../../../../../services/ToastService";

export interface PostContextProps {
  isReplying?: boolean;
  setIsReplying?: any;
  replies?: Array<any>;
  setReplies: any;
  commentsData?: Array<any>;
  setCommentsData?: any;
  fetchComments?: (id: string, commentLimit: number) => void;
  addPostComment?: (obj: any, id: string) => void;
  fetchCommentReplies?: (commentID: string, postId: string) => void;
  likeOnComment?: (postId: string, id: string) => Promise<any>;
  addPostReaction?: (postId: string, reaction: string) => Promise<any>;
  postReactionType?: string;
}

export const PostContext = createContext<PostContextProps | null>(null);

export const PostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [commentsData, setCommentsData] = useState<any>([]);
  const [replies, setReplies] = useState<any>([]);
  const [postReactionType, setPostReactionType] = useState<string>("Like");

  const fetchComments = useCallback(
    async (id: string, commentLimit: number) => {
      const {
        data: { getCommentsByid, hasMoreComments },
      } = await PostService.getCommentsByPostId(id, "", commentLimit);
      setCommentsData(getCommentsByid?.comments);
    },
    []
  );

  const fetchCommentReplies = useCallback(
    async (commentID: string, postId: string) => {
      const nextCursor = "";
      const limit = 10;
      const commentId = commentID;
      const { comments } = await PostService.getRepliesForComment(
        postId,
        nextCursor,
        limit,
        commentId
      );
      return comments;
    },
    []
  );

  const addPostComment = async (obj: any, id: string) => {
    try {
      const res = await PostService.addPostComment(id, {
        text: obj?.comment,
        parentId: obj?.parentId,
      });
      setCommentsData([res.data.addComment, ...commentsData]);
    } catch (err: any) {
      ToastService.error(err.message);
    }
  };

  const likeOnComment = useCallback(async (postId: string, id: string) => {
    const {
      data: { addLikeOnComment },
    } = await PostService.addLikeOnComment(postId, id);
    return addLikeOnComment;
  }, []);

  const addPostReaction = useCallback(
    async (postId: string, reaction: string) => {
      const res = await PostService.addReactionOnPost(postId, reaction);
      if (res) {
        const str = reaction.toLowerCase();
        setPostReactionType(str.charAt(0).toUpperCase() + str.slice(1));
      }
    },
    []
  );

  return (
    <PostContext.Provider
      value={{
        commentsData,
        setCommentsData,
        fetchComments,
        addPostComment,
        fetchCommentReplies,
        replies,
        setReplies,
        likeOnComment,
        postReactionType,
        addPostReaction,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
