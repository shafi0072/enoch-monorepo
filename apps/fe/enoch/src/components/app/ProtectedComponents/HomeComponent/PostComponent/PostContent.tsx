import React from "react";
import styles from "./Post.module.css";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
import PollCard from "./PollCard";

interface PostContentProps {
  type: "Video" | "Image" | "Text" | "Poll";
  content: any;
}

const Pages = {
  Text: ({ content }: any) => (
    <div className={styles.postContentDescription}>
      {parse(content.caption)}
    </div>
  ),
  Video: ({ content }: any) => (
    <div className={styles.postContentVideo}>
      <div className={styles.postContentCaption}>
        {content.caption && content.caption}
      </div>
      <ReactPlayer url={content.url} playing controls width="100%" />
    </div>
  ),
  Image: ({ content }: any) => (
    <div>
      {content.caption && (
        <div className={styles.postContentCaption}>{content.caption}</div>
      )}
      <div className={styles.postContentImage}>
        <img src={content.url} alt="" />
      </div>
    </div>
  ),
  Poll: ({ content }: any) => <PollCard {...{ content }} />,
};

const PostContent = ({ type, content }: PostContentProps) => {
  const [pageType, setPageType] = React.useState(type);
  const PostTypeComponentMaps = Pages[pageType];
  return (
    <div className={styles.postContent}>
      <PostTypeComponentMaps {...{ content }} />
    </div>
  );
};

export default PostContent;
