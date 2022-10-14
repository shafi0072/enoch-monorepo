import React from "react";

const ShareDocument = () => {
  return (
    <div id="Documents" className="posttabcontent">
      <h2 className="posting-step-hd-title current">Share a document</h2>
      <div className="posting-steps-document">
        <div className="step-doc-upld-btn">
          <a href="#!" className="btn posting-step-upload-btn">
            <input type="file" />
            Upload
          </a>
        </div>
        <p className="step-doc-para1">Or upload from the cloud:</p>
        <div className="document-btn-grp">
          <span>
            <a href="#!" className="btn step-savedrive-btn">
              <img src="images/dropbox.png" className="img-fluid mr-2" />
              Dropbox
            </a>
          </span>
          <span>
            <a href="#!" className="btn step-savedrive-btn">
              <img src="images/gdrive.png" className="img-fluid mr-2" />
              Google Drive
            </a>
          </span>
        </div>
      </div>
      <p className="step-doc-para2">
        For accessibility purposes, Enoch members who can view your post will be
        able to download your document as a PDF. Learn more
      </p>
      <p className="addhash-txt">Add hashtag</p>
    </div>
  );
};

export default ShareDocument;
