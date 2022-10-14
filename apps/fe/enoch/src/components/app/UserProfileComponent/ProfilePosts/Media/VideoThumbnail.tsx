import React from "react";

interface Props {
  videoData: any;
  isPremium?: boolean;
  playVideo(videoUrl: string): void;
}

const VideoThumbnail = ({ playVideo, isPremium, videoData }: Props) => {
  const { url, image, rating, time, isPrivate } = videoData;
  return (
    <>
      <li onClick={() => playVideo(url)} className="subcribe_media_play">
        <div className="manage_media--product">
          {isPrivate && (
            <div className="private_content_overlay">
              <div className="private_content_overlay_inner">
                <span>
                  <img src="/images/privet_media_icon.svg" alt="" />
                </span>
                <h6>Private Content</h6>
                <button>Private Content</button>
              </div>
            </div>
          )}
          <img
            className="vdeo_listimage img-fluid"
            src="images/premium_media_img_1.png"
            alt=""
          />
          {isPremium && (
            <span className="premium_icon">
              <img
                src="/images/premium_icon.svg"
                alt="icon"
                className="img-fluid"
              />
            </span>
          )}
          <img className="vdeo_listimage img-fluid" src={image} alt="" />

          <div className="svgs_icons">
            <div className="play_icon_rting">
              <img src="/images/Play_video1.svg" alt="" />
              <span className="rating_count">{rating}</span>
            </div>

            <div className="time_post">
              <span className="time_post_avex">{time}</span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default VideoThumbnail;
