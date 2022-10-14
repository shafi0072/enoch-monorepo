import React from "react";

interface Props {
  closeDialog(): void;
  message: string;
  title: string;
}
const Dialog = ({ closeDialog, title, message }: Props) => {
  return (
    <div className="media_delete_alert_box d-block">
      <h3>
        {title}
        <span className="alert_close_cross">
          <img src="images/alert_close_cross.svg" alt="" className="img-flid" />
        </span>
      </h3>
      <h4>{message}</h4>
      <div className="media_delete_alert_btns">
        <button onClick={closeDialog} className="cancel_btn">
          Cancel
        </button>
        <button className="confirm_btn">Confirm</button>
      </div>
    </div>
  );
};

export default Dialog;
