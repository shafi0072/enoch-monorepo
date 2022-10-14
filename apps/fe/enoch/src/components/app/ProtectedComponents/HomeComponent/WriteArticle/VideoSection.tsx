import React from "react";

const VideoSection = () => {
  return (
    <div className="video-tab-content">
      <div className="video-upload-icon">
        <img
          src="/images/upload-video-icon.svg"
          alt="img"
          className="img-fluid"
        />
      </div>
      <div className="Video-Link-box">
        <a href="#">Video Link</a>
      </div>
      <p>Youtube, Vimeo and more</p>
    </div>
  );
};

export default VideoSection;
