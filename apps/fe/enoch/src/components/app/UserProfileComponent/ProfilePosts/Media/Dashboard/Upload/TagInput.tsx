import React, { useCallback } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Props {
  tags: any;
  setTags: any;
}

const TagInput = ({ setTags, tags }: Props) => {
  const handleKeyDown = (e: any) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };

  const removeTag = useCallback(
    (i) => {
      setTags(tags.filter((tag: any, index: any) => index !== i));
    },
    [tags]
  );
  return (
    <li>
      <div className="title_input_nft">
        <h4>Tags</h4>
      </div>
      <div className="nft_input_avex">
        {tags.map((tag: any, i: any) => (
          <div key={i} className="tag-item">
            <span>
              {tag}{" "}
              <IoMdCloseCircleOutline
                className="ml-2"
                onClick={() => removeTag(i)}
              />
            </span>
          </div>
        ))}
        <input
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Placeholder"
        />
      </div>
    </li>
  );
};

export default TagInput;
