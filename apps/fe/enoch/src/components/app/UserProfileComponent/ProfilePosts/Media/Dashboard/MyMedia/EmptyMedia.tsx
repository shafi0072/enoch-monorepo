import React from "react";

const EmptyMedia = () => {
  return (
    <div className="mamane_media_no_content_sect">
      <span>
        <img
          src="/images/manage_media_no_content_img.svg"
          alt="img"
          className="img-fluid"
        />
      </span>
      <h4>No media Found</h4>
    </div>
  );
};

export default EmptyMedia;
