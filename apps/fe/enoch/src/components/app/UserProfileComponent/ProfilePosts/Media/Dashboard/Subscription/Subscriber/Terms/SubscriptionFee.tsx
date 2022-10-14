import React from "react";

interface Props {
  showSubscriber(): void;
}

const SubscriptionFee = ({ showSubscriber }: Props) => {
  return (
    <>
      <div className="subscribed-sale-fee" id="fee">
        <div className="fee-payment">
          <h2>Subscription Fee</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="plans-for-search">
          <h3>Subscription plans</h3>
          <input
            type="text"
            name=""
            id=""
            className=""
            placeholder="$0.00 / month"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>
        <div className="footer-buttons">
          <button onClick={showSubscriber} className="cancel-btn">
            Cancel
          </button>
          <button onClick={showSubscriber} className="next-btn" id="next-subs">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default SubscriptionFee;
