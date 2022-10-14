import React from "react";
import { thumbnails } from ".";
import VideoThumbnail from "./VideoThumbnail";

interface Props {
  playVideo(val: string): void;
}

const PremiumMedia = ({ playVideo }: Props) => {
  return (
    <>
      <div id="midia_list_video" className="d-block avex_tabcontent">
        <ul className="avex_nft_profile">
          {thumbnails.map((videoData) => (
            <VideoThumbnail
              key={videoData.id}
              {...{ playVideo, isPremium: true, videoData }}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default PremiumMedia;
