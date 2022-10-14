import { useContext, useState } from "react";
import styles from "./Post.module.css";
import { PostContext } from "./PostContext";

interface ReactionProps {
  id: number;
  icon: JSX.Element;
  bgColor: string;
  reaction: string;
}
interface Props {
  reactionType?: ReactionProps;
  postId?: string;
  reactedIcons?: boolean;
}
const IconButton = ({ postId, reactionType, reactedIcons }: Props) => {
  const { addPostReaction }: any = useContext(PostContext);
  return (
    <div
      onClick={() => addPostReaction(postId, reactionType?.reaction)}
      style={{ backgroundColor: reactionType?.bgColor }}
      className={reactedIcons ? styles.iconBtnSm : styles.iconBtn}
    >
      {reactionType?.icon}
    </div>
  );
};

export default IconButton;
