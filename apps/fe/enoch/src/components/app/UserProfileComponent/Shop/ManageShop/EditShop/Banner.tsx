import React from "react";
import SelectInputField from "../../../../../core/components/SelectInputField";

const selectStyles = {
  border: "1px solid #E8E9EB",
  backgroundColor: "transparent",
  fontSize: "14px",
  borderRadius: "0",
  fontFamily: "Poppins",
  height: "100%",
};

const Banner = ({ seteditShopPage }: any) => {
  return (
    <div className="mamage_media_body_content bg-white">
      <div className="shop-banner-header">
        <div className="heading-for-Shop-Ban">
          <h2>Select shop Banner</h2>
        </div>
        <div className="sale-chose-btn">
          <button className="skip-sale">Skip Sale</button>
          <button
            className="Next-sale"
            onClick={() => seteditShopPage("SHOP_ITEMS")}
          >
            Next
          </button>
        </div>
      </div>
      <div className="Banner-selection-pics">
        <ul>
          <li className="The-Banner-snaps">
            <div className="circular-back-round SmallSquarePhoto overflow-hidden">
              <img src="/images/banner-shop.png" alt="" />
            </div>
            <div className="checkboxes-pop">
              <label className="contain-check">
                <input type="checkbox" className="check-show" />
              </label>
              <p className="banner-names">Spring Banner</p>
            </div>
          </li>
          <li className="The-Banner-snaps">
            <div className="circular-back-round SmallSquarePhoto">
              <img src="/image/spring-main.png" alt="" />
            </div>
            <div className="checkboxes-pop">
              <label className="contain-check">
                <input type="checkbox" className="check-show" />
              </label>
              <p className="banner-names">Spring Banner</p>
            </div>
          </li>
          <li className="The-Banner-snaps">
            <div className="circular-back-round SmallSquarePhoto">
              <img src="/image/spring-main.png" alt="" />
            </div>
            <div className="checkboxes-pop">
              <label className="contain-check">
                <input type="checkbox" className="check-show" />
              </label>
              <p className="banner-names">Spring Banner</p>
            </div>
          </li>
          <li className="The-Banner-snaps">
            <div className="circular-back-round SmallSquarePhoto">
              <img src="/image/spring-main.png" alt="" />
            </div>
            <div className="checkboxes-pop">
              <label className="contain-check">
                <input type="checkbox" className="check-show" />
              </label>
              <p className="banner-names">Spring Banner</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="customized-texture">
        <h2>Write your custom Text</h2>
      </div>
      <ul className="two-parts-selection">
        <li className="left-part-chase">
          <div className="shop-banner-section">
            <label className="select-for-banner">Select Banner</label>
            <SelectInputField
              placeholder="Select Banner"
              controlStyle={selectStyles}
            />
          </div>
          <div className="form-group-react">
            <label className="select-for-banner">Write Text</label>
            <textarea className="rounded-0 desk-help" />
          </div>
        </li>
      </ul>
      <div className="end-btns-for-banner">
        <button className="skip-sale">Skip Sale</button>
        <button
          className="Next-sale"
          onClick={() => seteditShopPage("SHOP_ITEMS")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Banner;
