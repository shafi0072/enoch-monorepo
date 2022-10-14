import React from "react";

const VideoReaction = () => {
  return (
    <div className="video_react_sect">
      <ul>
        <li>
          <span>
            <img
              src="/images/react_gift.svg"
              alt="icon"
              className="img-fluid"
            />
          </span>
        </li>
        <li>
          <span>
            <img
              src="/images/react_like.svg"
              alt="icon"
              className="img-fluid"
            />
          </span>
          <div className="react_counter">12</div>
        </li>
        <li className="video_love_react">
          <span>
            <img
              src="/images/react_love.svg"
              alt="icon"
              className="img-fluid"
            />
          </span>
          <div className="react_counter">4</div>
        </li>
      </ul>
    </div>
  );
};

export default VideoReaction;
