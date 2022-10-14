import React from "react";
import { thumbnails } from ".";
import VideoThumbnail from "./VideoThumbnail";

interface Props {
  playVideo(val: string): void;
}

const FreeMedia = ({ playVideo }: Props) => {
  return (
    <div id="midia_list_video" className="avex_tabcontent d-block">
      <ul className="avex_nft_profile">
        {thumbnails.map((videoData) => (
          <VideoThumbnail key={videoData.id} {...{ playVideo, videoData }} />
        ))}
      </ul>
    </div>
  );
};

export default FreeMedia;
