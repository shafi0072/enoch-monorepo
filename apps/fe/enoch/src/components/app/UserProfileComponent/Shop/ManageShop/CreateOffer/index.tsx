import React from "react";
import SelectInputField from "../../../../../core/components/SelectInputField";

const selectStyles = {
  marginBottom: "0px",
  border: "1px solid #E8E9EB",
  backgroundColor: "transparent",
  padding: "5px",
  fontSize: "16px",
  borderRadius: "0",
  fontFamily: "Poppins",
  height: "auto",
};

const CreateOffer = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="create-offer-section-main bg-white">
      <div className="create-offer-header">
        <h3>Create Offer</h3>
        <div className="header-main-btn">
          <button className="back-node" onClick={() => setPage("MANAGE_SHOP")}>
            Back
          </button>
          <button className="public-off disabled">Publish Offer</button>
        </div>
      </div>
      <div className="two-sections-variable-inflex">
        <form className="main-selected-items-left-section">
          <div className="select-main-section">
            <label className="labeling-marks">Select Item*</label>
            <div className="input-avtar-search">
              <input placeholder="Search NFT to create an offer" />
            </div>
          </div>
          <div className="offer-duration-section">
            <label className="labeling-marks">Offer duration</label>
            <div className="sale-hours-for-push">
              <SelectInputField
                controlStyle={selectStyles}
                placeholder="Days"
              />
              <SelectInputField
                controlStyle={selectStyles}
                placeholder="Hours"
              />
              <SelectInputField
                controlStyle={selectStyles}
                placeholder="Minutes"
              />
            </div>
          </div>
          <div className="select-offer-main-price">
            <label className="labeling-marks">Select Offer price*</label>
            <SelectInputField controlStyle={selectStyles} placeholder="Days" />
          </div>
          <div className="select-main-section pt-3">
            <label className="labeling-marks">
              Create an offer for individual
            </label>
            <div className="input-avtar-search">
              <input placeholder="Search and select user" />
            </div>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default CreateOffer;
