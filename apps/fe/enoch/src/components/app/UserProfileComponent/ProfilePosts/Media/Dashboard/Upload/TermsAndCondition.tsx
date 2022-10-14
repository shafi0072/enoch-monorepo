import React from "react";

interface Props {
  register: any;
  HookFormRegisterTypes: any;
}
const TermsAndCondition = ({ register, HookFormRegisterTypes }: Props) => (
  <div className="trms_condition_sec">
    <div className="terms_cndition_deading">
      <h3>Terms &amp; Condition</h3>
    </div>
    <div className="terms_cndition_decrp">
      <div className="manage_media_main_check_box manage_media_check_box">
        <label className="container">
          <input
            type="checkbox"
            {...register(HookFormRegisterTypes.TERMS_AND_CONDITIONS)}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <p>
        {" "}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
    </div>
  </div>
);

export default TermsAndCondition;
