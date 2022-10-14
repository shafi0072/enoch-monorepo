import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { BsFlagFill, BsVolumeMuteFill } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { HiOutlineCode } from "react-icons/hi";
import { RiCloseCircleFill } from "react-icons/ri";
import styles from "./Post.module.css";
import PostDropdownButton from "./PostDropdownButton";

const PostDropdown = ({ name }: { name: string }) => {
  return (
    <div className={styles.postDropdown}>
      <PostDropdownButton
        icon={<BiBookmark size={25} color="#8a9099" />}
        label="Save"
        description="Save for later"
      />
      <PostDropdownButton
        icon={<FiLink size={25} color="#8a9099" />}
        label="Copy link to paste"
      />
      <PostDropdownButton
        icon={<HiOutlineCode size={25} color="#8a9099" />}
        label="Embed this post"
        description="This post is offensive or the account is hacked"
      />
      <PostDropdownButton
        icon={<RiCloseCircleFill size={25} color="#8a9099" />}
        label={`Unfollow @${name}`}
        description="This post is offensive or the account is hacked"
      />
      <PostDropdownButton
        icon={<BsVolumeMuteFill size={25} color="#8a9099" />}
        label={`Mute @${name}`}
        description="This post is offensive or the account is hacked"
      />
      <PostDropdownButton
        icon={<AiFillEyeInvisible size={25} color="#8a9099" />}
        label="I don't want to see this"
        description="This post is offensive or the account is hacked"
      />
      <PostDropdownButton
        icon={<BsFlagFill size={25} color="#8a9099" />}
        label="Report this post"
        description="This post is offensive or the account is hacked"
      />
      <PostDropdownButton
        icon={<AiFillEye size={25} color="#8a9099" />}
        label="Who can see this post?"
        description="This post is offensive or the account is hacked"
      />
    </div>
  );
};

export default PostDropdown;
