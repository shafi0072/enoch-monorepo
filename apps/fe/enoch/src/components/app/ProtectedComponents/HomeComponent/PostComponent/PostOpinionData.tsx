import React from "react";
import {
  FaCommentAlt,
  FaEye,
  FaHandHoldingHeart,
  FaHandsWash,
} from "react-icons/fa";
import { GiAngelOutfit } from "react-icons/gi";
import styles from "./Post.module.css";
import PostButton from "./PostButton";
import { convertNumberToShortString } from "../../../../../utils/index";
import { BiGroup } from "react-icons/bi";
import {
  BsFillEmojiLaughingFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";

import { AiFillHeart } from "react-icons/ai";
import { HiLightBulb } from "react-icons/hi";
import IconButton from "./IconButton";
import Reactions, { ReactionTypes } from "./Reactions";

interface PostOpinionDataProps {
  comments: number;
  views: number;
  likes: number;
}

const PostOpinionData = ({ comments, views, likes }: PostOpinionDataProps) => {
  return (
    <div className="px-2">
      <div className={styles.postOpinionData}>
        <PostButton
          icon={<ReactionImage />}
          label={convertNumberToShortString(likes)}
          className={styles.postOpinionDataBtn}
          labelView={true}
        />
        <PostButton
          icon={<FaCommentAlt size={18} color="#2BBD54" />}
          label={`${convertNumberToShortString(comments)} comments`}
          className={styles.postOpinionDataBtn}
          labelView={true}
        />
        <PostButton
          icon={<FaEye size={20} color="#474CD4" />}
          label={`${convertNumberToShortString(views)} Views`}
          className={styles.postOpinionDataBtn}
          labelView={true}
        />
        <PostButton
          icon={<BiGroup size={20} color="orange" />}
          label={`$${convertNumberToShortString(33)}`}
          className={styles.postOpinionDataBtn}
          labelView={true}
        />
        <PostButton
          icon={<GiAngelOutfit size={20} color="#F629C8" />}
          label={`$${convertNumberToShortString(12)}`}
          className={styles.postOpinionDataBtn}
          labelView={true}
        />
      </div>
    </div>
  );
};

const ReactionImage = () => {
  return (
    <div className="d-flex items-center justify-content-between gap-1">
      <Reactions reactedIcons={true} />
    </div>
  );
};

export default PostOpinionData;
