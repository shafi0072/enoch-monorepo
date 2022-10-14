import React from "react";

interface Props {
  handleActiveTab(val: string): void;
}
const SubscriptionPlan = ({ handleActiveTab }: Props) => {
  return (
    <>
      <div className="subscribe_content_sect">
        <div className="subscribe_content_inner">
          <div className="subscribe_content_header">
            <h2>Subscription Plan</h2>
          </div>
          <div className="subscribe_content_body">
            <div className="subscribe_discover_banner">
              {/* <h3 className="mb-6">Discover</h3> */}
              {/* <h4>Premium Subscription</h4> */}
              <h5 className="mt-6">
                Get Premium content for uninterrupted view
              </h5>
            </div>
            <div className="follow_premium_content_sect">
              <h3>
                You need to follow the user to suscribe the premium content
              </h3>
              <div className="follow_premium_content_right">
                <a href="#">
                  <span>
                    <img
                      src="/images/1ch.png"
                      alt="img"
                      className="img-fluid"
                    />
                  </span>
                  <h6>@Hulk66</h6>
                </a>
                <button>Follow</button>
              </div>
            </div>
            <div className="premium_subscribe_text">
              <h3>Premium Subscription</h3>
              <p>
                Access all of the Creator’s premium media that you can consume
                it at any time.
              </p>
            </div>
            <div className="premium_subscribe_gift_sect">
              <h3>Gifts</h3>
              <div className="premium_subscribe_gift_bg">
                <div className="premium_subscribe_gift_left">
                  <h4>
                    Unlock exclusive gifts{" "}
                    <span>
                      <img
                        src="/images/gift_icon.svg"
                        alt=""
                        className="img-fluid"
                      />
                    </span>{" "}
                    <br /> while watching premium Media.
                  </h4>
                  <button
                    onClick={() => handleActiveTab("rewards")}
                    className="know_more_btn"
                  >
                    KNOW MORE
                  </button>
                </div>
                <div className="premium_subscribe_gift_right">
                  <span>
                    <img src="images/gift_img.png" alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="premium_subscribe_text">
              <h3>Select subscription plan</h3>
              <p>
                <span>
                  Subscribe to the host to get exclusive badges, emotes, and
                  gifts, and join subscriber-only discussions
                </span>{" "}
                <a href="#"> Know more.</a>
              </p>
            </div>

            <div className="plans">
              <label className="plan basic-plan">
                <input checked type="radio" name="plan" id="basic" />
                <div className="plan-content">
                  <div className="plan-details">
                    <h5>Auto renewal</h5>
                    <h6>$4.99/month</h6>
                  </div>
                </div>
              </label>

              <label className="plan complete-plan">
                <input type="radio" id="complete" name="plan" />
                <div className="plan-content">
                  <div className="plan-details">
                    <h5>1 month</h5>
                    <h6>$4.99</h6>
                  </div>
                </div>
              </label>
            </div>

            {/* <div className="subscription_plan_sect">
              <h4>Subscription plans</h4>
              <div className="subscription_plan_cards">
                <div className="subscription_plan_box active">
                  <h5>Auto renewal</h5>
                  <h6>$4.99/month</h6>
                </div>
                <div className="subscription_plan_box">
                  <h5>1 month</h5>
                  <h6>$4.99</h6>
                </div>
              </div>
            </div> */}

            <div className="premium_subscribe_text mb-4">
              <h3>Payment & Fee</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="premium_subscribe_text">
              <h3>Rules to Understand</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="premium_subscribe_checkbox manage_media_check_box">
              <label className="container">
                By clicking Subscribe, you agree to{" "}
                <a href="#">Enoch Premium Subscrition Terms & Policy</a>
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </div>

            <button className="subscribe_now_btn">Subscribe now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlan;
