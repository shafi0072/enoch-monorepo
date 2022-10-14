import React from "react";
import Accordion from "./Accordion";
import RepeatAccordion from "./RepeatAccordion";
import Badges from "./Rewards/Badges";
import Emojis from "./Rewards/Emojis";
import Gifts from "./Rewards/Gifts";

const SubscriberReward = () => {
  return (
    <div className="mamage_media_body_content">
      <div className="awards-card-wrap mt-0">
        <h2>Subscriber Reward</h2>
        <div className="toggle-box-wrap">
          <div className="main-left-stat">
            <div className="toogle-damp">
              <label className="toogle-switch">
                <input type="checkbox" checked={true} />
                <span className="slide-right blow-back"></span>
              </label>
            </div>
          </div>
          <div className="toogle-descriptive">
            <p>
              When turned on, your subscriber will be alerted when they have a
              chance to earn the rewards. Learn More
            </p>
            <p className="turned-on">
              Note: It may take up to five minutes for your rewards to enabled
              status change to be reflected in the system.
            </p>
          </div>
        </div>
      </div>
      <div className="Round-scroll-for-badges">
        <div className="enable-Badges">
          <h1>Enable badges</h1>
          <RepeatAccordion count={5}>
            <Accordion {...{ heading: "Accordion one" }}>
              <Badges />
            </Accordion>
          </RepeatAccordion>
        </div>
      </div>

      <div className="Round-scroll-for-badges">
        <div className="enable-Badges">
          <h1>Enable Emojis</h1>
          <RepeatAccordion count={4}>
            <Accordion {...{ heading: "Accordion one" }}>
              <Emojis />
            </Accordion>
          </RepeatAccordion>
        </div>
      </div>

      <div className="Round-scroll-for-badges">
        <div className="enable-Badges">
          <h1>Enable Gifts</h1>
          <RepeatAccordion count={3}>
            <Accordion {...{ heading: "Accordion one" }}>
              <Gifts />
            </Accordion>
          </RepeatAccordion>
        </div>
      </div>

      <div className="footer-buttons">
        <button className="cancel-btn">Skip</button>
        <button className="next-btn" id="go-to-fee">
          Next
        </button>
      </div>
    </div>
  );
};

export default SubscriberReward;
