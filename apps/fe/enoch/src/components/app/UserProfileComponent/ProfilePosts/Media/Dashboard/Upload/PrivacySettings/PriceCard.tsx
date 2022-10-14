import React, { useState } from "react";

interface Props {
  RadioButtons: any;
  privacy: any;
  register: any;
  HookFormRegisterTypes: any;
}
const PriceCard = ({
  RadioButtons,
  privacy,
  register,
  HookFormRegisterTypes,
}: Props) => (
  <>
    <div className="preminum_feture_sec h-25">
      <div className="heading_preminum_box">
        <h3>Premium feature</h3>
      </div>

      <div className="avex_upload-type-radio-sect2">
        <label className="container_avex_nft_upld2">
          <strong>
            Pay per view
            <span>Anyone can search and view</span>
          </strong>
          <input
            type="radio"
            value={RadioButtons.PAY_PER_VIEW}
            {...register(HookFormRegisterTypes.PRIVACY)}
          />
          <span className="checkmark"></span>
        </label>
      </div>

      {privacy === RadioButtons.PAY_PER_VIEW && (
        <div className="set_price_preminum">
          <div className="set_heading">
            <h3>Set price for your video</h3>
            <div className="set_price_input2">
              <input
                type="text"
                id=""
                placeholder="$0.00"
                {...register(HookFormRegisterTypes.PAY_PER_VIEW_COST)}
              />
            </div>
            <div className="descrp_upload_avex">
              <p>
                you can not set more than $5.00 price. As It is a premium
                service we will take.
              </p>
            </div>
          </div>
        </div>
      )}

      <div id="alert_div2" className="lyer_alert">
        <div className="alert-icon">
          <img src="images/alert_info.png" alt="alrt" />
          <div className="text_alrt">
            <p>Your profile still not eligible to use the Premium feature.</p>
            <p>
              <a className="more_details_btn" href="#">
                Click here
              </a>
              to know more
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);
export default PriceCard;
