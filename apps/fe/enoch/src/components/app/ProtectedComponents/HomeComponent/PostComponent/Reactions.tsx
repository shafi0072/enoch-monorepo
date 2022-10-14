import React from "react";
import { AiFillHeart } from "react-icons/ai";
import {
  BsFillEmojiLaughingFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { FaHandHoldingHeart, FaHandsWash } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { PostReactionEnums } from "../../../../../constants/post-enums";
import IconButton from "./IconButton";

interface Props {
  postId?: string;
  reactedIcons?: boolean;
}

export const ReactionTypes = [
  {
    id: 1,
    bgColor: "#7612F9",
    icon: <BsFillHandThumbsUpFill size={16} color="#fff" />,
    reaction: PostReactionEnums.LIKE,
  },
  {
    id: 2,
    bgColor: "#EA1F41",
    icon: <AiFillHeart size={16} color="#fff" />,
    reaction: PostReactionEnums.HEART,
  },
  {
    id: 3,
    bgColor: "#59A111",
    icon: <FaHandHoldingHeart size={16} color="#fff" />,
    reaction: PostReactionEnums.CARE,
  },
  {
    id: 4,
    bgColor: "#C013EB",
    icon: <FaHandsWash size={16} color="#fff" />,
    reaction: PostReactionEnums.CLAP,
  },
  {
    id: 5,
    bgColor: "#E27600",
    icon: <HiLightBulb size={16} color="#fff" />,
    reaction: PostReactionEnums.IDEA,
  },
  {
    id: 6,
    bgColor: "#007791",
    icon: <BsFillEmojiLaughingFill size={16} color="#fff" />,
    reaction: PostReactionEnums.AMAZE,
  },
];

const Reactions = ({ postId, reactedIcons }: Props) => {
  return (
    <div className="d-flex items-center justify-content-between">
      {ReactionTypes.map((reactionType) => (
        <IconButton {...{ reactionType, postId, reactedIcons }} />
      ))}
    </div>
  );
};

export default Reactions;
