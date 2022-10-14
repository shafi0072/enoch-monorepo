import React from "react";
import ActiveVideo from "./ActiveVideo";
import VideoList from "./VideoList";

interface Props {
  activeVideoURL: string;
  setActiveVideoURL: React.Dispatch<React.SetStateAction<string>>;
  handleModal(): void;
}

const Content = ({ handleModal, activeVideoURL, setActiveVideoURL }: Props) => {
  return (
    <div className="media_play_modal_content media_ply_avex mt-0">
      <button onClick={handleModal} className="media_play_modal_close">
        <img
          src="/images/media_modal_close.svg"
          alt="icon"
          className="img-fluid"
        />
      </button>
      <div className="row flex-row-video_list">
        <VideoList {...{ setActiveVideoURL }} />
        <ActiveVideo {...{ activeVideoURL }} />
      </div>
    </div>
  );
};

export default Content;
