import React, { useCallback, useState } from "react";
import { DropdownWithIcon } from "../../../../../../core/components/DropdownWithIcon";
import HashtagField from "../../../../../../core/components/HashtagField";

interface Props {
  toggleModal: () => void;
  selectedImage: string;
  handleActiveComponent: (val: string) => void;
  setSelectedImage: any;
}

const audiences = [
  {
    value: "Anyone",
    label: "Anyone",
    icon: "/images/Globe2.png",
  },
  {
    value: "Anyone + Twitter",
    label: "Anyone + Twitter",
    icon: "/images/Globe2.png",
  },
  {
    value: "Followers Only",
    label: "Followers Only",
    icon: "/images/Globe2.png",
  },
];

const SharePostPopup = ({
  toggleModal,
  selectedImage,
  handleActiveComponent,
  setSelectedImage,
}: Props) => {
  const [audience, setAudience] = useState<string>("Anyone");
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleImageDelete = useCallback(() => {
    setSelectedImage("");
    handleActiveComponent("select-image");
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdown((prev) => !prev);
  }, []);

  return (
    <div className="max-width-620">
      <div className="Celebrate-Modal-header">
        <h2 className="pb-0">Share</h2>
        <span className="close" onClick={toggleModal}>
          <img
            src="/images/post-close.png"
            alt="close"
            className="img-fluid"
            data-dismiss="modal"
          />
        </span>
      </div>
      <div className="Celebrate-modal-body pt-4">
        <div className="Celebrate-Modal-share-content">
          <div className="Celebrate-Modal-share-post-headings">
            <div className="Celebrate-Modal-share-post-dp">
              <img
                src="/images/share-post-user-dp.png"
                alt="img"
                className="img-fluid"
              />
            </div>
            <div className="Celebrate-Modal-share-post-user-name">
              <h2 className="pb-0 border-bottom-0">Hulk 88</h2>
              <DropdownWithIcon
                options={audiences}
                onChange={(val: any) => setAudience(val)}
              />
            </div>
          </div>
          <div className="Celebrate-Modal-share-post-body">
            <textarea
              value={inputValue}
              placeholder="We are excited to have you join our team. Any tips to help them
              get started?"
              onChange={(e) => setInputValue(e.target.value)}
            />

            <div className="Celebrate-Modal-share-post-img">
              <div className="Celebrate-post-midImg">
                <img src={selectedImage} alt="img" className="img-fluid" />
              </div>
              <div className="Celebrate-Modal-share-post-edit-btn">
                <button onClick={() => handleActiveComponent("select-image")}>
                  <img
                    src="/images/share-post-img-edit.png"
                    alt="icon"
                    className="img-fluid"
                  />
                </button>
                <button onClick={handleImageDelete}>
                  <img
                    src="/images/share-post-img-close.png"
                    alt="icon"
                    className="img-fluid"
                  />
                </button>
              </div>
            </div>
            <HashtagField {...{ tags, setTags }} />
          </div>
          <div className="Celebrate-Modal-share-post-icon-list">
            <ul>
              <li>
                <img
                  src="/images/post-icon1-hov.png"
                  alt="icon"
                  className="img-fluid"
                />
              </li>
              <li>
                <img
                  src="/images/post-icon2-hov.png"
                  alt="icon"
                  className="img-fluid"
                />
              </li>
              <li>
                <img
                  src="/images/post-icon3-hov.png"
                  alt="icon"
                  className="img-fluid"
                />
              </li>
              <li>
                <img
                  src="/images/post-icon4-hov.png"
                  alt="icon"
                  className="img-fluid"
                />
              </li>
              <li>
                <img
                  src="/images/post-icon5-hov.png"
                  alt="icon"
                  className="img-fluid"
                />
              </li>
              <li className="info mr-0">
                <img
                  src="/images/post-icon6.png"
                  alt="icon"
                  className="img-fluid"
                />
              </li>
            </ul>
            <button data-dismiss="modal">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePostPopup;
