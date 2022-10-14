import React, {
  useCallback,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import { base64ToBlob } from "base64-blob";
import Tab from "../../../../../core/components/Tab";
import EditImage from ".";
import ImageDescription from "./ImageDescription";
import Tag from "./TagImage";
import TagImage from "./TagImage";
import { PostContext } from "../../../../../../../pages/create-post/PostContext";
import dynamic from "next/dynamic";
const ImageEditorWrapper = dynamic(
  () => import("../../../../../core/components/ImageEditorWrapper"),
  { ssr: false }
);
const TagFaceWraper = dynamic(() => import("./TagImage/TagFaceWraper"), {
  ssr: false,
});
interface Props {
  image: any;
  setImage: React.Dispatch<any>;
  Tabs: any;
  onImageSelect: (val: string) => void;
  setImageThumbnail: React.Dispatch<React.SetStateAction<string>>;
  annotations:any, 
  setAnnotations:any
}
const tabType = {
  TEXT: "text",
  EDIT: "edit",
  TAG: "tag",
};

const PreviewImage = ({
  image,
  setImage,
  onImageSelect,
  Tabs,
  setImageThumbnail,
  annotations, 
  setAnnotations
}: Props) => {
  const [hasRefLoaded, setHasRefLoaded] = useState(false);
  const { setfooterVisible } = useContext(PostContext);
  const [activeTab, setActiveTab] = useState<string>(Tabs.EDIT);
  const [imageDes, setImageDes] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cropState, setCropState] = useState<any>({
    rotate: 0,
    straighten: {
      min: 1,
      max: 5,
      step: 1,
      value: 1,
    },
    cropAspectRatio: null,
    zoom: {
      min: 1,
      max: 5,
      step: 1,
      value: 1,
    },
  });

  const [adjustments, setAdjustments] = useState<any>({
    brightness: {
      min: 0,
      max: 100,
      value: 0,
    },
    contrast: {
      min: 0,
      max: 100,
      value: 0,
    },
    saturation: {
      min: 0,
      max: 100,
      value: 0,
    },
    vignette: {
      min: 0,
      max: 100,
      value: 0,
    },
  });
  
  const [tagCaption, setTagCaption] = useState<boolean>(true);
  const handleActiveComponent = useCallback((activeComponentName: string) => {
    setActiveTab(activeComponentName);
  }, []);

  const editorRef = useRef<any | null>(null);

  const viewChanger = useCallback(() => {
    if (activeTab === tabType.EDIT) {
      handleActiveComponent(Tabs.IMAGE_PREVIEW);
    } else {
      onImageSelect(Tabs.SELECT_IMAGE);
      setfooterVisible(true);
    }
  }, [activeTab]);

  const handleLoadedImage = useCallback(
    (editor) => {
      editorRef.current = editor;
      setHasRefLoaded(true);
    },
    [editorRef.current, tabType]
  );

  const handleImage = useCallback(() => {
    let imageName = editorRef.current.getImageName();
    let dataURL = editorRef.current.toDataURL();

    setImageThumbnail(dataURL);
    base64ToBlob(dataURL)
      .then((data) => {
        if (data) {
          const file = new File([data], imageName);
          if (file) {
            setImage(file);
            onImageSelect(Tabs.IMAGE_POST);
          }
        }
      })
      .catch((e) => setErrorMessage(e.message));
  }, []);
  return (
    <div className="editYour-photo-sect">
      {" "}
      <div className="editYour-photo-headings">
        {" "}
        <h3> Edit your photo</h3>
      </div>{" "}
      <div className="editYour-photo-body">
        {" "}
        <div className="editYour-photo-body-img-sect">
          {" "}
          {activeTab !== tabType.TAG && (
            <ImageEditorWrapper
              onEditorInit={(editor: any) => {
                editor?.loadImageFromFile(image).then(function (result: any) {
                  editor?.clearUndoStack();
                  handleLoadedImage(editor);
                });
              }}
              options={{
                selectionStyle: {
                  cornerSize: 20,
                  rotatingPointOffset: 70,
                },
              }}
            />
          )}
          {activeTab === tabType.TEXT && (
            <ImageDescription {...{ imageDes, setImageDes }} />
          )}
          <div>
            {" "}
            {activeTab === tabType.TAG && (
              <TagFaceWraper
              setTagCaption={setTagCaption}
                imagePath={editorRef?.current?.toDataURL()}
                annotations={annotations}
                setAnnotations={setAnnotations}
              />
            )}
          </div>{" "}
          {activeTab === tabType.TAG && tagCaption  && <TagImage />}
        </div>{" "}
        <div className="editYour-photo-menu">
          {" "}
          <div className="edit_Photo_tab-btns">
            {" "}
            <button
              onClick={() => handleActiveComponent(tabType.EDIT)}
              className={`edit_Photo_tablinks edit-photo-btn  ${
                activeTab === tabType.EDIT && "active"
              }`}
            >
              {" "}
              Edit
            </button>{" "}
            <button
              onClick={() => handleActiveComponent(tabType.TAG)}
              className={`edit_Photo_tablinks ${
                activeTab === tabType.TAG && "active"
              }`}
              id="TagBtn"
            >
              {" "}
              Tag
            </button>{" "}
            <button
              onClick={() => handleActiveComponent(tabType.TEXT)}
              className={`edit_Photo_tablinks ${
                activeTab === tabType.TEXT && "active"
              }`}
              id="AltTextBtn"
            >
              {" "}
              Alt.text
            </button>
          </div>
        </div>{" "}
        {hasRefLoaded && activeTab === tabType.EDIT && (
          <Tab
            activeComponent={activeTab}
            {...{
              tabName: tabType.EDIT,
            }}
          >
            {" "}
            <EditImage
              {...{
                image,
                setImage,
                cropState,
                setCropState,
                adjustments,
                setAdjustments,
              }}
              editorRef={editorRef}
            />{" "}
          </Tab>
        )}{" "}
        <div className="editYour-photo-footer">
          {" "}
          <button onClick={() => viewChanger()} className="backBtn">
            {" "}
            Back
          </button>{" "}
          <button onClick={handleImage} className="doneBtn">
            {" "}
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewImage;
