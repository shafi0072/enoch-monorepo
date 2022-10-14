import React, { Dispatch, SetStateAction, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import {
  MdArticle,
  MdConnectWithoutContact,
  MdEventNote,
  MdGroups,
} from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";
import ShareButton from "./ShareButton";
import styles from "./SharedPost.module.css";
import { IoClose, IoEarth } from "react-icons/io5";
import { Button } from "../../../../../core";
import { DropdownWithIcon } from "../../../../../core/components/DropdownWithIcon";

interface SharePostProps {
  setshareModal: Dispatch<SetStateAction<boolean>>;
}

const data = [
  { value: "Hulk", label: "Hulk", icon: "/images/profile.png" },
  {
    value: "Drake",
    label: "Drake",
    icon: "/images/profile.png",
  },
];

const followers = [
  { value: "Anyone", label: "Anyone", icon: <IoEarth size={22} /> },
  {
    value: "Connection only",
    label: "Connection only",
    icon: <MdConnectWithoutContact size={22} />,
  },
  {
    value: "Group only",
    label: "Group only",
    icon: <MdGroups size={22} />,
  },
];

const SharePost = ({ setshareModal }: SharePostProps) => {
  const [sharePostcomment, setsharePostcomment] = useState<string>("");
  const [user, setuser] = useState<string>(data[0].value);
  const [shareWith, setshareWith] = useState<string>(followers[0].value);

  const handleShare = (e: any) => {
    e.preventDefault();
    console.log(sharePostcomment, user, shareWith);
  };
  return (
    <div className={styles.sharePostModal}>
      <div className={styles.sharePostHeader}>
        <h1>Share Post</h1>
        <div
          className={styles.sharePostClose}
          onClick={() => setshareModal(false)}
        >
          <IoClose size={22} />
        </div>
      </div>
      <div className={styles.sharePostSelectOptions}>
        {/* drop down with icon */}
        <DropdownWithIcon
          options={data}
          onChange={(val: any) => setuser(val)}
        />
        <DropdownWithIcon
          options={followers}
          onChange={(val: any) => setshareWith(val)}
        />
      </div>
      <textarea
        value={sharePostcomment}
        onChange={(e) => setsharePostcomment(e.target.value)}
        className={styles.sharePostTextarea}
        placeholder="Write here"
      />
      <div className="d-flex justify-content-between">
        <ShareButton
          icon={<HiPhotograph size={25} color="#E48C34" />}
          label="Photo"
        />
        <ShareButton
          icon={<RiVideoFill size={25} color="#2468CE" />}
          label="Video"
        />
        <ShareButton
          icon={<MdEventNote size={25} color="#6FB063" />}
          label="Event"
        />
        <ShareButton
          icon={<MdArticle size={25} color="#FA6450" />}
          label="Write article"
        />
      </div>
      <div className="d-flex justify-content-end mt-2">
        <Button
          handler={handleShare}
          text="Post"
          type="button"
          className={styles.postButton}
        />
      </div>
    </div>
  );
};

export default SharePost;
