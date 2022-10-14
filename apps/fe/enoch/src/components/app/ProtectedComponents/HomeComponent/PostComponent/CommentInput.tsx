import React, { useState, useRef, useCallback, useContext } from "react";
import { HiOutlineEmojiHappy, HiPhotograph } from "react-icons/hi";
import styles from "./Post.module.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Editor from "../../../../core/lib/Editor";
import PostService from "../../../../../services/PostService";
import ToastService from "../../../../../services/ToastService";
import { PostContext } from "./PostContext";
import { BiSend } from "react-icons/bi";

const CommentInput = ({ postId, parentId, addPostComment, user }: any) => {
  const [emojiDropdown, setemojiDropdown] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(user || "");
  const [commentImgPop, setcommentImgPop] = useState<boolean>(false);

  const [commentImage, setcommentImage] = useState<any>({
    preview: "",
    raw: "",
  });
  const inputRef = useRef<any>();

  const handleChange = useCallback(
    (e: any) => {
      setComment(e.target.value);
      setemojiDropdown(false);
    },
    [comment]
  );

  const addEmoji = useCallback(
    (val: any) => {
      inputRef.current.focus();
      let sym = val.unified.split("-");
      let codesArray: any = [];
      sym.forEach((el: any) => codesArray.push("0x" + el));
      let emoji = String.fromCodePoint(...codesArray);
      setComment(comment + emoji);
    },
    [comment]
  );

  const handleImage = useCallback(
    (e: any) => {
      setemojiDropdown(false);
      if (e.target.files.length) {
        setcommentImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        });
      }
    },
    [commentImage]
  );

  const postComment = async (e: any) => {
    e.preventDefault();
    addPostComment({ comment, parentId }, postId);
    setComment("");
  };

  async function suggestPeople(searchTerm: string) {
    const allPeople = [
      {
        id: 1,
        value: "Fredrik Sundqvist",
      },
      {
        id: 2,
        value: "Patrik Sjölin",
      },
    ];
    return allPeople.filter((person) => person.value.includes(searchTerm));
  }

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputImg}>
        <img
          src="/images/userAvtar/user-Av4.png"
          alt=""
          className="img-fluid"
        />
      </div>

      <form onSubmit={postComment} className={styles.inputBox}>
        <Editor
          value={comment}
          className="commentEditor"
          handleData={(val: any) => setComment(val)}
          modules={{
            toolbar: null,
          }}
        />
        <div className="position-relative">
          <HiOutlineEmojiHappy
            size={25}
            color="#31CFE4"
            onClick={() => setemojiDropdown(!emojiDropdown)}
          />
          <div className={styles.emojiPicker}>
            {emojiDropdown && <Picker set="facebook" onSelect={addEmoji} />}
          </div>
        </div>
        <div>
          <label htmlFor="img-btn" style={{ cursor: "pointer" }}>
            <HiPhotograph size={25} color="#E48C34" />
          </label>
          <input
            id="img-btn"
            type="file"
            accept="image/*"
            className="d-none"
            onChange={handleImage}
          />
        </div>
        <input type="submit" className="d-none" />
        <button
          type="submit"
          className="bg-transparent border-0 d-flex align-items-center justify-content-center"
        >
          <BiSend size={22} color="#0B83E3" />
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
