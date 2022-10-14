import React, { useCallback, useState } from "react";
import { Modal } from "../../../../../core";
import Tab from "../../../../../core/components/Tab";
import PostUIWrapper from "../PostUIWrapper";
import SelectCelebrateImagePopup from "./Popups/SelectCelebrateImagePopup";
import SelectRecipientPopup from "./Popups/SelectRecipientPopup";
import SharePostPopup from "./Popups/SharePostPopup";

interface Option {
  id: number;
  heading: string;
  shortDes: string;
}

const options = [
  {
    id: 1,
    heading: "Welcome to the enoch",
    shortDes: "Welcoming your friends and fans to enoch platform",
  },
  {
    id: 2,
    heading: "Give Kudos",
    shortDes: "Show appreciation to your colleague",
  },
  {
    id: 3,
    heading: "Credit celebration",
    shortDes: "Share a new project milestone",
  },
  {
    id: 4,
    heading: "Show appreciation",
    shortDes: "Show a nice gesture to your friends and fans",
  },
  {
    id: 5,
    heading: "Get inspired",
    shortDes: "Tag your buddy ",
  },
];

const Celebrate = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] =
    useState<string>("select-image");
  const [selectedImage, setSelectedImage] = useState<any>("");

  const toggleModal = () => {
    setIsModal((prev) => !prev);
  };

  const handleActiveComponent = useCallback((val: string) => {
    setActiveComponent(val);
  }, []);

  return (
    <>
      <PostUIWrapper>
        <h2 className="posting-step-hd-title">Select an option</h2>
        <div className="posting-step-celebrate">
          <ul>
            {options.map((option: Option) => (
              <li key={option.id} onClick={toggleModal}>
                <h3>{option.heading}</h3>
                <p>{option.shortDes}</p>
              </li>
            ))}
          </ul>
        </div>
      </PostUIWrapper>
      <Modal isOpen={isModal}>
        <Tab {...{ activeComponent, tabName: "select-image" }}>
          <SelectCelebrateImagePopup
            {...{
              handleActiveComponent,
              toggleModal,
              setSelectedImage,
              selectedImage,
            }}
          />
        </Tab>
        <Tab {...{ activeComponent, tabName: "select-recipient" }}>
          <SelectRecipientPopup {...{ toggleModal, handleActiveComponent }} />
        </Tab>
        <Tab {...{ activeComponent, tabName: "post-share" }}>
          <SharePostPopup
            {...{
              toggleModal,
              selectedImage,
              handleActiveComponent,
              setSelectedImage,
            }}
          />
        </Tab>
      </Modal>
    </>
  );
};

export default Celebrate;
