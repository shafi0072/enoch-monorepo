import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  AiFillHeart,
  AiOutlineDislike,
  AiOutlineGift,
  AiOutlineLike,
} from "react-icons/ai";
import {
  FaHandHoldingHeart,
  FaHandsWash,
  FaRegCommentDots,
} from "react-icons/fa";
import { FiSend, FiShare2 } from "react-icons/fi";
import PostButton from "./PostButton";
import styles from "./Post.module.css";
import Reactions from "./Reactions";
import SharePost from "./SharePostComponent";
import { Modal } from "../../../../core";
import {
  BsFillEmojiLaughingFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { HiLightBulb } from "react-icons/hi";
import { PostContext } from "./PostContext";

interface PostOpinionProps {
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
  showComments: boolean;
  postId?: string;
}

enum reactionTypeEnums {
  LIKE = "Like",
  HEART = "Heart",
  CLAP = "Clap",
  IDEA = "Idea",
  CARE = "Care",
  AMAZE = "Amaze",
}

const PostOpinions = ({
  setShowComments,
  showComments,
  postId,
}: PostOpinionProps) => {
  const [likesModal, setlikesModal] = useState<boolean>(false);
  const [shareModal, setshareModal] = useState<boolean>(false);
  const { postReactionType }: any = useContext(PostContext);

  return (
    <div className={styles.postOpinion}>
      <div className={styles.likeWrapper}>
        <div>
          <Reactions postId={postId} />
        </div>
        <PostButton
          icon={<AiOutlineLike size={20} />}
          label={postReactionType}
          onClick={() => setlikesModal(true)}
        />
      </div>
      <PostButton icon={<AiOutlineDislike size={20} />} label="Dislike" />
      <PostButton icon={<AiOutlineGift size={20} />} label="Gift" />
      <PostButton
        icon={<FaRegCommentDots size={20} />}
        label="Comment"
        onClick={() => setShowComments(!showComments)}
      />
      <div>
        <Modal isOpen={shareModal} bgColor="transparent">
          <SharePost {...{ setshareModal }} />
        </Modal>
        <PostButton
          icon={<FiShare2 size={20} />}
          label="Share"
          onClick={() => setshareModal(true)}
        />
      </div>
      <PostButton icon={<FiSend size={20} />} label="Send" />
    </div>
  );
};

export default PostOpinions;
