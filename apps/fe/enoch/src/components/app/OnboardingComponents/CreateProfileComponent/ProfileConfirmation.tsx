import React from "react";

const ProfileConfirmation = ({
  confirmationPop,
}: {
  confirmationPop: boolean;
}) => {
  return (
    <div className="onboard-gentleRemainder-block">
      <div
        id="user-gentle-reminder"
        className={`${
          confirmationPop ? "modal onboard-gentleRemainder-modal open" : "modal onboard-gentleRemainder-modal"
        }`}
      >
        <div className="modal-dialog">
          <div className="modal-content gentleRemainder-modalcontent">
            <div className="gentleRemainder-modalcontent-hd">
              <img
                src="/images/gentleremainder-bg.png"
                className="img-fluid"
                alt="bg"
              />
              <div className="gentleremainder-hd-txt">
                <h2>Gentle</h2>
                <h3>Reminder</h3>
              </div>
            </div>
            <div className="gentleremainder-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <ul>
                <li>
                  1st Offense:
                  <span className="green-Rclr">7-Day Incentive Freeze</span>
                </li>
                <li>
                  2ndOffense:
                  <span className="yellw-Rclr">14-Day Incentive Freeze</span>
                </li>
                <li>
                  3rd and Final Offense:
                  <span className="accent-Rclr"> Incentive Freeze</span>
                </li>
                <li>
                  Special Condition:
                  <span className="red-Rclr"> Permanent Ban</span>
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident,.
              </p>
              <div className="gentleremainder-btn-grp">
                <button
                  className="gentleremainder-decline-btn"
                  data-dismiss="modal"
                >
                  DECLINE
                </button>
                <button className="gentleremainder-agree-btn">AGREE (7)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileConfirmation;
