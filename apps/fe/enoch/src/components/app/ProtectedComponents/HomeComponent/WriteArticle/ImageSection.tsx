import React from "react";

const ImageContent = () => {
  return (
    <div className="Image-tab-content">
      <div className="img-upload-icon">
        <img
          src="/images/upload-photo-icon.svg"
          alt="img"
          className="img-fluid"
        />
      </div>
      <div className="image-upload-text-sect">
        <h5>Drop an image here or</h5>
        <div className="image-upload-btn mb-1">
          <input
            type="file"
            id="upload_img_file"
            className="position-absolute opacity-0"
          />
          <button type="button" id="custom_image_upload_button">
            Upload from computer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageContent;
