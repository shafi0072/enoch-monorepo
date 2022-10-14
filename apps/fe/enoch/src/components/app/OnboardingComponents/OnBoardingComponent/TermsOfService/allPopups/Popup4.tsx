import React from "react";

const Popup4 = () => {
  return (
    <div className="carousel-item item active">
      <div className="img-bg disp-flex mbl-flex-direction bg-blue">
        <div className="w-50-100 mbl-100 mbl-order-2 pos-relative">
          <div className="top-icon go-shoping">
            <img
              src="/images/shopping.png"
              className="enochpop-slide-icon"
              alt="..."
            />
          </div>
          <div className="text-area-left mbl-text-bottom go-shoping">
            <h1 className="slider-heading">Go shopping</h1>
            <p className="slider-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <div className="w-50-100 mbl-img-section mbl-order-1 cart-img"></div>
      </div>
    </div>
  );
};

export default Popup4;
