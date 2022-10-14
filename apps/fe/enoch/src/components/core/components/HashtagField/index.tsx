import React, { useCallback, useState } from "react";
import { MdClose } from "react-icons/md";
import Tag from "./Tag";

interface Props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

enum constants {
  placeholder = "Add Hashtag",
  EnterKey = "Enter",
}

const HashtagField = ({ tags, setTags }: Props) => {
  const [isFieldActive, setIsFieldActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("#");

  const toggleTagInput = useCallback(() => {
    setIsFieldActive((prev): any => !prev);
    setTags([]);
    setInputValue("#");
  }, []);

  const addHashTag = useCallback(
    (e: any) => {
      const value = e.target.value;
      if (e.key === constants.EnterKey) {
        if (value !== "#" && value !== "#," && value !== ",") {
          setTags([...tags, value]);
          setInputValue("#");
        }
      } else return;
    },
    [tags]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const deleteTag = useCallback(
    (i: any) => {
      setTags(tags.filter((tag, index) => index !== i));
    },
    [tags]
  );

  return (
    <>
      {isFieldActive ? (
        <div className="hashtag-feature-tag-container">
          <div className="hashtag-feature-tag-list">
            {tags.map((tag: string, index: number) => (
              <Tag {...{ tag, index, deleteTag }} />
            ))}
          </div>

          <input
            className="hashtag-feature-tag-input"
            value={inputValue}
            placeholder={constants.placeholder}
            onChange={handleInputChange}
            onKeyDown={addHashTag}
          />
          <MdClose onClick={toggleTagInput} size={20} cursor="pointer" />
        </div>
      ) : (
        <p className="addhash-txt mb-0 mt-2" onClick={toggleTagInput}>
          {constants.placeholder}
        </p>
      )}
    </>
  );
};

export default HashtagField;
