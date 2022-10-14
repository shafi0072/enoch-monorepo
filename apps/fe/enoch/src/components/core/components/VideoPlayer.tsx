import React from "react";
import ReactPlayer from "react-player";

interface Props {
  url: string;
  controls?: boolean;
  width?: string | number;
  height?: string;
  className?: any;
  light?: boolean;
}

const VideoPlayer = ({ url, controls, width, height, light }: Props) => {
  return (
    <ReactPlayer
      url={url}
      controls={controls}
      width="100%"
      height={height}
      light={light}
    />
  );
};

export default VideoPlayer;
