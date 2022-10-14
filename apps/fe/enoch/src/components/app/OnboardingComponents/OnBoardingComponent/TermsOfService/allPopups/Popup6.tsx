import React from "react";

const Popup6 = () => {
  return (
    <div className="carousel-item item active">
      <div className="img-bg disp-flex mbl-flex-direction bg-dark-blue dots-patteren">
        <div className="w-50-100 mbl-100 mbl-order-2 pos-relative">
          <div className="top-icon">
            <img
              src="/images/livestreaming.png"
              className="enochpop-slide-icon"
              alt="..."
            />
          </div>
          <div className="text-area-left mbl-text-bottom">
            <h1 className="slider-heading">Live Streaming</h1>
            <p className="slider-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <div className="w-50-100 mbl-img-section mbl-order-1 online-img"></div>
      </div>
    </div>
  );
};

export default Popup6;
