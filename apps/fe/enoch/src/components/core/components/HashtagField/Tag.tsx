import React, { useCallback, useState } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  tag: string;
  index: number;
  deleteTag(i: number): void;
}

const Tag = ({ tag, index, deleteTag }: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleHover = useCallback(() => {
    setIsHover((prev) => !prev);
  }, []);
  return (
    <div
      key={index}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="hashtag-feature-tag"
    >
      <p>{tag}</p>
      {isHover && (
        <MdClose
          className="hashtag-feature-remove-icon"
          onClick={() => deleteTag(index)}
        />
      )}
    </div>
  );
};

export default Tag;
