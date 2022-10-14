import React, { useState } from "react";
import VideoPlayer from "../../../../../core/components/VideoPlayer";
import CommentInput from "../../../../ProtectedComponents/HomeComponent/PostComponent/CommentInput";
import CommentsList from "../../../../ProtectedComponents/HomeComponent/PostComponent/CommentsList";
import PostOpinions from "../../../../ProtectedComponents/HomeComponent/PostComponent/PostOpinions";
import VideoReaction from "./VideoReaction";

interface Props {
  activeVideoURL: string;
}

const ActiveVideo = ({ activeVideoURL }: Props) => {
  const [showComments, setShowComments] = useState<boolean>(true);
  return (
    <div className="col-md-9 video_play_list_avex">
      <div className="Manage-vide-_sec">
        <div className="mid_bdy_vdeo">
          <div className="play_video-body-left-Col">
            <VideoPlayer
              {...{
                url: activeVideoURL,
              }}
            />
            <VideoReaction />
          </div>
        </div>
      </div>
      <div className="dApp-status-like-comment-share-sect">
        <PostOpinions {...{ showComments, setShowComments }} />
        <div className="dApp-post-comment-box">
          <CommentInput />
          <div className="media-play-comment-sect">
            <CommentsList followers={4} postId="" commentLimit={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveVideo;
