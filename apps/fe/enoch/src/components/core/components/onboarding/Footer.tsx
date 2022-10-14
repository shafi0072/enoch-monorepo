import React from "react";

const Footer = () => {
  return (
    <div className="enoch-bg enoch-mac-section">
      <div className="EnochMain">
        <img className="downloadIcon" src="/images/Enoch-download.png" />
        <div className="m-lft-20 enochTextWrap">
          <span className="enoch-mac-text">Enoch on Mac</span>
          <p className="desc">
            Launch Enoch from your dock and stay up to date with desktop
            notifications.
          </p>
        </div>
      </div>
      <div className="downloadButton">
        <button className="text-white align-self-center download-link">
          Download
        </button>
      </div>
    </div>
  );
};

export default Footer;
