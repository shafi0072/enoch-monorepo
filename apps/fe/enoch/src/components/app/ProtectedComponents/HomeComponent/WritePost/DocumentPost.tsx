import React, { useCallback, useContext, useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import DropboxChooser from "react-dropbox-chooser";
import PostUIWrapper from "./PostUIWrapper";
import { PostContext } from "../../../../../../pages/create-post/PostContext";
import { formatBytes, getFile } from "../../../../../utils";
import config from "../../../../../config";
import HashtagField from "../../../../core/components/HashtagField";

interface Props {
  setSelectedFile: any;
  selectedFile: any;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setPreview: any;
  setPostReady: React.Dispatch<React.SetStateAction<boolean>>;
}
const DocumentPost = ({
  setSelectedFile,
  selectedFile,
  setPreview,
  setTitle,
  setPostReady,
}: Props) => {
  const [openPicker] = useDrivePicker();
  const [isSelect, setIsSelect] = useState(true);
  const { setfooterVisible } = useContext(PostContext);
  const [tags, setTags] = useState<string[]>([]);

  const onSubmit = useCallback(() => {
    setPreview(true);
    setPostReady(true);
    setfooterVisible(true);
  }, []);

  const handleChange = useCallback((e: any) => {
    setSelectedFile(e.target.files[0]);
    setIsSelect(false);
    setfooterVisible(false);
  }, []);

  const goBack = useCallback(() => {
    setIsSelect(true);
    setfooterVisible(true);
  }, []);

  const googlePicker = useCallback(() => {
    openPicker({
      clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_DOCUMENT}`,
      developerKey: `${process.env.NEXT_PUBLIC_GOOGLE_DEVELOPER_KEY_DOCUMENT}`,
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,

      callbackFunction: async (data) => {
        if (data.action === "picked") {
          const { name, url } = data.docs[0];
          var arr = url.split("/");
          const id = arr[arr.length - 2];
          const downloadURL = `${config.env.GOOGLE_DRIVE_DOWNLOAD_END_POINT}${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_DEVELOPER_KEY_DOCUMENT}&alt=media`;
          const file = await getFile(downloadURL, name);
          setSelectedFile(file);
          setIsSelect(false);
          setfooterVisible(false);
        }
      },
    });
  }, []);

  const dropboxPicker = useCallback(async (files: any) => {
    const { name, link } = files[0];
    const { pathname } = new URL(link);
    const url = `${config.env.DROPBOX_HOST_STRING}${pathname}`;
    const file = await getFile(url, name);
    setSelectedFile(file);
    setIsSelect(false);
    setfooterVisible(false);
  }, []);

  return (
    <>
      {isSelect ? (
        <>
          <PostUIWrapper>
            <h2 className="posting-step-hd-title">Share a document</h2>
            <div className="posting-steps-document">
              <div className="step-doc-upld-btn">
                <a href="#!" className="btn posting-step-upload-btn">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleChange}
                  />
                  Upload
                </a>
              </div>
              <p className="step-doc-para1">Or upload from the cloud:</p>
              <div className="document-btn-grp d-flex">
                <span>
                  <DropboxChooser
                    appKey={process.env.NEXT_PUBLIC_DROPBOX_API_KEY}
                    success={dropboxPicker}
                  >
                    <a href="#!" className="btn step-savedrive-btn">
                      <img
                        src="/images/dropbox.png"
                        className="img-fluid mr-2"
                      />
                      Dropbox
                    </a>
                  </DropboxChooser>
                </span>
                <span onClick={googlePicker}>
                  <a href="#!" className="btn step-savedrive-btn">
                    <img src="/images/gdrive.png" className="img-fluid mr-2" />
                    Google Drive
                  </a>
                </span>
              </div>
            </div>
            <p className="step-doc-para2">
              For accessibility purposes, Enoch members who can view your post
              will be able to download your document as a PDF. Learn more
            </p>
            <HashtagField {...{ tags, setTags }} />
          </PostUIWrapper>
        </>
      ) : (
        <div className="posting-steps-block-left home-img-upload-sect-left p-0">
          <div className="home-img-upload-sect-headings">
            <h3>Share a document</h3>
          </div>
          <div className="home-img-upload-sect-body">
            <form onSubmit={onSubmit}>
              <div className="input-title">
                <input
                  type="text"
                  placeholder="Add a descriptive title to your document"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="upload-pdf-box">
                <div className="uploading">
                  <img
                    src="/images/pdf-img.svg"
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="upload-pdf-name d-block">
                  <h4>{selectedFile.name}</h4>
                  <h5>{formatBytes(selectedFile.size)}</h5>
                </div>
                <div
                  className={`upload-pdf-progress-bar  w-100
                    `}
                ></div>
              </div>
              <p>
                For accessibility purposes, Enoch members who can view your post
                will be able to download your document as a PDF.
                <a href="#">Learn more</a>
              </p>
              <div className="home-img-upload-sect-footer">
                <button onClick={goBack} className="back-btn">
                  Back
                </button>
                <button type="submit" className="done-btn">
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentPost;
