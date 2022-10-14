import React, { ReactNode, useCallback, useState } from "react";
import Editor from "../../../../core/lib/Editor";
import { useRouter } from "next/router";
import { Modal } from "../../../../core";
import Tab from "../../../../core/components/Tab";
import Audience from "./Popups/Audience";
import Community from "./Popups/Community";
import PostingAs from "./Popups/PostingAs";
import VoteCard from "./VoteCard";
import DocumentCard from "./DocumentCard";
import { toolbarOptions } from "../../../../core/lib/Editor/toolbar";
import HashtagField from "../../../../core/components/HashtagField";

const tabType = {
  POSTING_AS: "posting-as",
  AUDIENCE: "audience",
  COMMUNITY: "community",
};

interface Props {
  textData?: string;
  setTextData: React.Dispatch<React.SetStateAction<string>>;
  handleActiveComponent?: (val: string) => void;
  setCommunity?: any;
  children?: ReactNode;
  data?: any;
  setAudienceValue: any;
  extraData?: any;
  setExtraData?: any;
  documentCardData?: any;
  audience?: any;
  setAudience?: any;
  postingAs?: any;
  setPostingAs?: any;
}
const IntialCreatePost = ({
  setCommunity,
  data,
  textData,
  setTextData,
  audience,
  postingAs,
  setAudience,
  setPostingAs,
  setAudienceValue,
}: Props) => {
  const [isModal, setIsModal] = useState(false);
  const [activeComponent, setActiveComponent] = useState(tabType.POSTING_AS);
  const [tags, setTags] = useState<string[]>([]);

  const location = useRouter();

  const closeModal = () => {
    setIsModal(false);
  };

  const openPostingAs = useCallback(() => {
    setActiveComponent(tabType.POSTING_AS);
    setIsModal(true);
  }, []);

  const openAudidence = useCallback(() => {
    setActiveComponent(tabType.AUDIENCE);
    setIsModal(true);
  }, []);

  const openCommunity = useCallback(() => {
    setActiveComponent(tabType.COMMUNITY);
  }, []);

  console.log(tags);

  return (
    <>
      <div className="post-user-modal-block">
        <Modal isOpen={isModal}>
          <Tab {...{ activeComponent, tabName: tabType.POSTING_AS }}>
            <PostingAs {...{ closeModal, setPostingAs }} />
          </Tab>

          <Tab {...{ activeComponent, tabName: tabType.AUDIENCE }}>
            <Audience
              {...{ openCommunity, closeModal, setAudience, setAudienceValue }}
            />
          </Tab>

          <Tab {...{ activeComponent, tabName: tabType.COMMUNITY }}>
            <Community
              {...{ closeModal, setCommunity, setActiveComponent, setAudience }}
            />
          </Tab>
        </Modal>
      </div>

      <h2 className="posting-step-hd-title current">Create Post</h2>

      <div className="posting-steps-dropbox-block">
        <div className="posting-steps-dropbox" onClick={openPostingAs}>
          <a href="#!" className="posting-steps-dropbox-input">
            <span>
              <img
                src="/images/postInfo.png"
                className="img-fluid"
                alt="icon"
              />
            </span>
            {postingAs}
          </a>
        </div>

        <div className="posting-steps-dropbox" onClick={openAudidence}>
          <a
            href="#!"
            className="posting-steps-dropbox-input"
            data-toggle="modal"
            data-target="post-user-modal2"
          >
            <span>
              <img src="/images/Globe2.png" className="img-fluid" alt="icon" />
            </span>
            {audience}
          </a>
        </div>
      </div>
      <div className="posting-steps-innerbody">
        <Editor
          value={textData}
          handleData={(val: any) => setTextData(val)}
          placeholder="What do you want to talk about?"
          modules={{ toolbar: toolbarOptions }}
        />
        {location.pathname === "/create-post/poll" ? (
          <VoteCard {...{ data }} />
        ) : null}

        {location.pathname === "/create-post/document" ? (
          <DocumentCard {...{ data }} />
        ) : null}
      </div>
      <HashtagField {...{ tags, setTags }} />
    </>
  );
};

export default IntialCreatePost;
