import React, { useCallback, useContext, useState } from "react";
import Dropzone from "react-dropzone";
import { PostContext } from "../../../../../../pages/create-post/PostContext";
import { Controller } from "react-hook-form";
import SelectInputField from "../../../../core/components/SelectInputField";
import Tab from "../../../../core/components/Tab";
import PreviewImage from "./EditImage/PreviewImage";
import PostUIWrapper from "./PostUIWrapper";
interface Props {
  handleSubmit: any;
  register: any;
  image: string | ArrayBuffer | null | any;
  setImage: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null | any>
  >;
  control: any;
  imageThumbnail?: string;
  setImageThumbnail: React.Dispatch<React.SetStateAction<string>>;
}

const options = [
  { value: "defisignal", label: "DeFi Signal " },
  { value: "88mph", label: "88mph" },
];

const Tabs = {
  SELECT_IMAGE: "select-image",
  IMAGE_PREVIEW: "image-preview",
  IMAGE_POST: "image-post",
};

const ImagePost = ({
  register,
  image,
  setImage,
  handleSubmit,
  control,
  imageThumbnail,
  setImageThumbnail,
}: Props) => {
  const { setfooterVisible } = useContext(PostContext);
  const [activeComponent, setActiveComponent] = useState(Tabs.SELECT_IMAGE);
  const [annotations, setAnnotations] = useState<any>([]);
  const onDropImage = useCallback((files: any) => {
    const [file] = files;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(file);
        setActiveComponent(Tabs.IMAGE_PREVIEW);
        setfooterVisible(false);

      }
    };
    reader.readAsDataURL(file);
  }, []);

  const cancelHandler = useCallback((val: string) => {
    setActiveComponent(val);
    setfooterVisible(true);
  }, []);

  const handleActiveComponent = useCallback((val: string) => {
    setActiveComponent(val);
  }, []);

  return (
    <>
      <Tab {...{ activeComponent, tabName: Tabs.SELECT_IMAGE }}>
        <PostUIWrapper>
          <h2 className="posting-step-hd-title">Share a photo</h2>
          <Dropzone onDrop={(acceptedFiles) => onDropImage(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div className="posting-steps-photo">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>
                    {" "}
                    Drag & drop images or,
                    <span>
                      <a className="btn posting-step-upload-btn cursor-pointer">
                        Upload
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
          <p className="addhash-txt mb-0">Add hashtag</p>
        </PostUIWrapper>
      </Tab>

      <Tab {...{ activeComponent, tabName: Tabs.IMAGE_PREVIEW }}>
        <PreviewImage
          {...{
            annotations, 
            setAnnotations,
            image,
            setImage,
            Tabs,
            onImageSelect: handleActiveComponent,
            setImageThumbnail,
          }}
        />
      </Tab>

      <Tab {...{ activeComponent, tabName: Tabs.IMAGE_POST }}>
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
                  {...register("message")}
                  placeholder="write a message"
                />
              </div>
              <div className="upload-img">
                <ul>
                  {image && (
                    <li>
                      <span>
                        <img
                          src={imageThumbnail}
                          alt="img"
                          className="img-fluid"
                        />
                      </span>
                      <button
                        onClick={() =>
                          handleActiveComponent(Tabs.IMAGE_PREVIEW)
                        }
                      >
                        <img
                          src="/images/share-img-Edit.svg"
                          alt="icon"
                          className="img-fluid"
                        />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
              <div className="upload-img-post-to-sect">
                <h4>Posts to</h4>
                <Controller
                  name="profile"
                  render={({ field: { onChange, value, ref, ...rest } }) => (
                    <SelectInputField
                      placeholder="Your profile"
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
                <button
                  className="cancel-btn"
                  onClick={() => cancelHandler("select-image")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`post-btn ${!image && "disable"}`}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </Tab>
    </>
  );
};

export default ImagePost;
