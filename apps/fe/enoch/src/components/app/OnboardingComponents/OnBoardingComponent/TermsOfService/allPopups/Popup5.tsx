import React from "react";

const Popup5 = () => {
  return (
    <div className="carousel-item item active">
      <div className="img-bg disp-flex mbl-flex-direction bg-black dots-patteren">
        <div className="w-50-100 mbl-100 mbl-order-2 pos-relative">
          <div className="top-icon">
            <img
              src="/images/becomecreater.png"
              className="enochpop-slide-icon"
              alt="..."
            />
          </div>
          <div className="text-area-left mbl-text-bottom">
            <h1 className="slider-heading">Become Creator</h1>
            <p className="slider-description">
              Create NFT’s and add a store in just few clicks and start selling
              colelctible arts, music, downloads, tickets, and band merch today.
              Best of all, we don't charge any gas fees.
            </p>
          </div>
        </div>

        <div className="w-50-100 mbl-img-section mbl-order-1 nfts-img"></div>
      </div>
    </div>
  );
};

export default Popup5;
