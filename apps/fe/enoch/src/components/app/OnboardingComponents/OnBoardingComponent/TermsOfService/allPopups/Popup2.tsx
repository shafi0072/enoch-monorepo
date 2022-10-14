import React from "react";

const Popup2 = () => {
  return (
    <div className="carousel-item item active">
      <div className="img-bg disp-flex mbl-flex-direction">
        <div className="w-50-100 mbl-100 mbl-order-2 pos-relative red-bg">
          <div className="top-icon post-feed">
            <img
              src="/images/posttofeed.png"
              className="enochpop-slide-icon"
              alt="..."
            />
          </div>
          <div className="text-area-left mbl-text-bottom">
            <h1 className="slider-heading">Post to feed</h1>
            <p className="slider-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <div className="w-50-100 mbl-img-section mbl-order-1 share-img "></div>
      </div>
    </div>
  );
};

export default Popup2;
