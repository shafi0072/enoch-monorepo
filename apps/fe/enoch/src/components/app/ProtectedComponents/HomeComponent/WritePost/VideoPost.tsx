import React, { useCallback, useContext, useState } from "react";
import ReactPlayer from "react-player";
import SelectInputField from "../../../../core/components/SelectInputField";
import PostUIWrapper from "./PostUIWrapper";
import { PostContext } from "../../../../../../pages/create-post/PostContext";
import { Controller } from "react-hook-form";
import HashtagField from "../../../../core/components/HashtagField";

interface Props {
  handleActiveComponent?: (val: string) => void;
  activeComponent?: string;
  setIsPostMethod?: React.Dispatch<React.SetStateAction<boolean>>;
}

const options = [
  { value: "PUBLIC", label: "Anyone" },
  { value: "CONNECTION_ONLY", label: "Followers Only" },
];

const VideoPost = ({
  handleSubmit,
  register,
  control,
  setSelectedFile,
  isLoading,
  isValid,
}: any) => {
  const { setfooterVisible } = useContext(PostContext);
  const [isSelect, setIsSelect] = useState(true);
  const [videoURL, setVideoURL] = useState<any>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setIsSelect(false);
    setfooterVisible(false);
    const url = URL.createObjectURL(file);
    setVideoURL(url);
  };

  const cancelHandler = useCallback(() => {
    setIsSelect(true);
    setfooterVisible(true);
  }, [isSelect]);

  return (
    <>
      {isSelect ? (
        <>
          <PostUIWrapper>
            <h2 className="posting-step-hd-title current">
              Select/Edit your video
            </h2>
            <div className="posting-steps-video">
              <p>
                <a>
                  Select video to share{" "}
                  <input
                    type="file"
                    onChange={handleChange}
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                </a>
              </p>
            </div>
            <HashtagField {...{ tags, setTags }} />
          </PostUIWrapper>
        </>
      ) : (
        <div className="posting-steps-block-left home-img-upload-sect-left p-0">
          <div className="home-img-upload-sect-headings">
            <h3>Share a photo</h3>
          </div>
          <div className="home-img-upload-sect-body">
            <form onSubmit={handleSubmit}>
              <div className="input-title">
                <input type="text" placeholder="Title" {...register("title")} />
              </div>
              <div className="input-message">
                <textarea
                  placeholder="write a message"
                  {...register("caption")}
                />
              </div>
              <div className="upload-img">
                <ul>
                  {videoURL && (
                    <ReactPlayer url={videoURL} className="video-thumbnail" />
                  )}
                </ul>
              </div>
              <div className="upload-img-post-to-sect">
                <h4>Audience</h4>
                <Controller
                  name="audience"
                  render={({ field: { onChange, value, ref, ...rest } }) => (
                    <SelectInputField
                      placeholder="Select audience"
                      rest={rest}
                      value={value}
                      ref={ref}
                      options={options}
                      onChange={onChange}
                    />
                  )}
                  control={control}
                  defaultValue={""}
                />
              </div>
              <div className="home-img-upload-sect-footer">
                <button className="cancel-btn" onClick={cancelHandler}>
                  Cancel
                </button>
                {isLoading ? (
                  <button className="post-btn" type="submit">
                    Posting...
                  </button>
                ) : (
                  <button
                    className={`post-btn ${!isValid && "disable"}`}
                    type="submit"
                  >
                    Post
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPost;
