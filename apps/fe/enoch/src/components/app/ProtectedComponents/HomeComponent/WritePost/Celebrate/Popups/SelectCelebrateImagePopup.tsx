import React, { useState } from "react";

interface Props {
  handleActiveComponent: (val: string) => void;
  toggleModal: () => void;
  setSelectedImage: any;
  selectedImage: string;
}

const images = [
  "/images/add-img-1.png",
  "/images/add-img-2.png",
  "/images/add-img-3.png",
];
const images2 = [
  "/images/add-img-4.png",
  "/images/add-img-5.png",
  "/images/add-img-6.png",
];

const SelectCelebrateImagePopup = ({
  handleActiveComponent,
  toggleModal,
  selectedImage,
  setSelectedImage,
}: Props) => {
  const setImage = (imageURL: string) => {
    setSelectedImage(imageURL);
  };

  const getImageAndShow = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div className="Celebrate-Modal-header">
        <h2 className="pb-0">Welcome to the team</h2>
        <span className="close" onClick={toggleModal}>
          <img
            src="/images/post-close.png"
            alt="close"
            className="img-fluid"
            data-dismiss="modal"
          />
        </span>
      </div>
      <div className="Celebrate-modal-body">
        <div className="Welcome-team-content">
          <div className="Celebrate-modal-Add-photo-content">
            <div className="Celebrate-modal-Add-photo-sect">
              {/* <!--Celebrate-modal-Add-photo-uploaded--> */}

              {selectedImage ? (
                <div
                  className="Celebrate-modal-Add-photo-uploaded"
                  style={{ display: "block" }}
                >
                  <img src={selectedImage} alt="img" className="img-fluid" />
                </div>
              ) : (
                <div className="Celebrate-modal-Add-photo-upload">
                  <input
                    type="file"
                    id="real-file"
                    onChange={getImageAndShow}
                  />
                  <button type="button" id="custom-button">
                    <img
                      src="/images/upload-img-Camera.png"
                      alt="icon"
                      className="img-fluid"
                    />
                    <span id="custom-text">Add a photo</span>
                  </button>
                  <p>or select from below</p>
                </div>
              )}
            </div>
            <div className="Celebrate-modal-Add-photo-footer">
              <h3>Welcome to the team</h3>
            </div>
          </div>
          <div className="Celebrate-modal-Add-photo-defult-gallery">
            <div className="Celebrate-modal-Add-photo-defult-gallery-img-list negative-margin">
              <ul className="ml-0">
                {images.map((img, i) => (
                  <li key={i} onClick={() => setImage(img)}>
                    <img src={img} alt="img" className="img-fluid" />
                  </li>
                ))}
              </ul>
              <ul className="mr-0">
                {images2.map((img, i) => (
                  <li key={i} onClick={() => setImage(img)}>
                    <img src={img} alt="img" className="img-fluid" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="Celebrate-Modal-footer">
        <button onClick={toggleModal} className="back-btn" data-dismiss="modal">
          Back
        </button>
        <button
          className="next-btn"
          onClick={() => handleActiveComponent("select-recipient")}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default SelectCelebrateImagePopup;
