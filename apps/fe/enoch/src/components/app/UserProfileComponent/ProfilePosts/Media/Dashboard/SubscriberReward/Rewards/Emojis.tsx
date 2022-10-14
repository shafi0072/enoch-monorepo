import React from "react";
import Badge from "../Badge";
import RepeatElement from "../RepeatElement";
import Repeat from "../RepeatElement";

const emojisArr = [
  {
    id: 1,
    title: "Badge Name",
    imageUrl: "/images/rambo-grre.png ",
    classname: "badge badge-blue",
  },
  {
    id: 2,
    title: "Badge Name",
    imageUrl: "/images/rambo-grre.png ",
    classname: "badge badge-pink",
  },
  {
    id: 3,
    title: "Badge Name",
    imageUrl: "/images/rambo-grre.png ",
    classname: "badge badge-orange",
  },
  {
    id: 4,
    title: "Badge Name",
    imageUrl: "/images/rambo-grre.png ",
    classname: "badge badge-dull",
  },
  {
    id: 5,
    title: "Badge Name",
    imageUrl: "/images/rambo-grre.png ",
    classname: "badge badge-dull",
  },
  {
    id: 6,
    title: "Badge Name",
    imageUrl: "/images/rambo-grre.png ",
    classname: "badge badge-pink",
  },
];

const Emojis = () => {
  return (
    <div className="faq-text change-term">
      <div className="section-enable-badges">
        <p>
          {" "}
          <strong>Summary :</strong>watch 10 Premium Media to collect additional
          badges!{" "}
        </p>
        <h6>Rewards for Your Subscriber</h6>
      </div>
      <div className="number-type-badges">
        <ul className="terms-of-award reward-teronolgy">
          {emojisArr.map((badge) => (
            <Badge badge={badge} />
          ))}
        </ul>
      </div>
      <div className="subs-needs-wealth">
        <h4>What Your Subscriber Needs to Do</h4>
        <h3>Go to a participating</h3>
        <RepeatElement count={7}>
          {({ index }: any) => (
            <p key={index}>
              {index + 1}. Watch for {index + 1} hour and claim the reward Green
              Monster
            </p>
          )}
        </RepeatElement>
      </div>
      <div className="footer-buttons">
        <button className="cancel-btn">Close</button>
        <button className="next-btn" id="next-subs">
          Enable
        </button>
      </div>
    </div>
  );
};

export default Emojis;
