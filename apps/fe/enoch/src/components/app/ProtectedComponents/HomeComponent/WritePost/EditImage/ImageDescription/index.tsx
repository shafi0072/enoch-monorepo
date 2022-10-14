import React, { useCallback, useState } from "react";

interface Props {
  imageDes: string;
  setImageDes: React.Dispatch<React.SetStateAction<string>>;
}
const maxChar = 300;

const ImageDescription = ({ setImageDes, imageDes = '20' }: Props) => {
  const checkChar = useCallback((text) => {
    if (text.length <= maxChar) {
      setImageDes(text);
    }
  }, []);
  return (
    <div className="editPhoto-Alttext d-block">
      <div className="editPhoto-Alttext-inner">
        <p className="editPhoto-Alttext-contnt mb-4">Alt text</p>
        <p className="editPhoto-Alttext-contnt">
          Alt text describes images for people who have trouble seeing them. If
          you don’t add alt text, it may be automatically generated after you
          post. You can edit it anytime.
        </p>
        <div className="editPhoto-Alttextarea">
          <textarea
            placeholder="Write a description of this photo for people who have trouble seeing it."
            className="editPhoto-Alttextarea-input"
            maxLength={maxChar}
            onChange={(e) => checkChar(e.target.value)}
          />
          <p className="editPhoto-Alttext-count">
            <span>{imageDes.length}</span>/{maxChar}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageDescription;
