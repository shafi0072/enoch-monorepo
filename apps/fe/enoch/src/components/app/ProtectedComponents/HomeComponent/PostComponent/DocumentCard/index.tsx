import React from "react";

const DocumentCard = () => {
  return (
    <div className="dApp-status-content-sect">
      <div className="drive-post-content-sect">
        <div className="drive-post-content">
          <div className="drive-post-content-text">
            <h4>Debrief Mailer &lt;file name&gt; - Google Drive</h4>
            <h5>drive.google.com</h5>
          </div>
          <div className="drive-post-content-sect-close">
            <img
              src="images/uploaded-pdf-cancel-icon.svg"
              alt="icon"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <div className="dApp-status-content-hashtag">
        <a href="#">Add hashtag</a>
      </div>
    </div>
  );
};

export default DocumentCard;
