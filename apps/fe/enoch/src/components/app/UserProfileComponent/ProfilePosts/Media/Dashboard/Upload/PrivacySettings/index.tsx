import React from "react";
import classnames from "classnames";
import PriceCard from "./PriceCard";

interface Props {
  RadioButtons: any;
  register: any;
  privacy: any;
  HookFormRegisterTypes: any;
}

const PrivacySettings = ({
  RadioButtons,
  register,
  privacy,
  HookFormRegisterTypes,
}: Props) => (
  <>
    <PriceCard
      {...{ RadioButtons, register, privacy, HookFormRegisterTypes }}
    />
    <div className="privacy_setting">
      <h4>Privacy Setting</h4>
      <span>
        <img src="images/info_setting.png" alt="" />
      </span>
    </div>
    <div className="avex_upload-type-radio-sect">
      <label className="container_avex_nft_upld">
        <strong>
          Public <span>Anyone can search and view</span>
        </strong>
        <input
          type="radio"
          value={RadioButtons.PUBLIC}
          {...register(HookFormRegisterTypes.PRIVACY)}
        />
        <span className="checkmark"></span>
      </label>
    </div>
    <div className="avex_upload-type-radio-sect">
      <label className="container_avex_nft_upld radio_private">
        <strong>
          Private <span>Only people you choose can view</span>
        </strong>
        <input
          type="radio"
          value={RadioButtons.PRIVATE}
          {...register(HookFormRegisterTypes.PRIVACY)}
        />
        <span className="checkmark"></span>
      </label>
    </div>

    <div className="followers_btns_avex ">
      <button
        className={classnames("green_highlight mr-2", {
          disable: privacy !== RadioButtons.PRIVATE,
        })}
      >
        230 Followers
      </button>
      <button
        className={classnames("purple_highlight", {
          disable: privacy !== RadioButtons.PRIVATE,
        })}
      >
        12 Followers
      </button>
    </div>
  </>
);

export default PrivacySettings;
