import React from "react";
import Accordion from "../../../SubscriberReward/Accordion";
import RepeatAccordion from "../../../SubscriberReward/RepeatAccordion";
import Badges from "../../../SubscriberReward/Rewards/Badges";

interface Props {
  handleActiveTab(val: string): void;
}
const EnableAwards = ({ handleActiveTab }: Props) => {
  return (
    <div className="awards-card-wrap" id="awards">
      <h2>Enable Awards</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
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
          <RepeatAccordion count={5}>
            <Accordion {...{ heading: "Accordion one" }}>
              <Badges />
            </Accordion>
          </RepeatAccordion>
        </div>
      </div>

      <div className="Round-scroll-for-badges">
        <div className="enable-Badges">
          <h1>Enable Gifts</h1>
          <RepeatAccordion count={5}>
            <Accordion {...{ heading: "Accordion one" }}>
              <Badges />
            </Accordion>
          </RepeatAccordion>
        </div>
      </div>
      <div className="footer-buttons">
        <button className="cancel-btn">Cancel</button>
        <button
          onClick={() => handleActiveTab("subscription_fee")}
          className="next-btn"
          id="next-subs"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EnableAwards;
