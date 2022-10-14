import React from "react";
import { FiUser } from "react-icons/fi";
import WidgetsExpendedView from "../WidgetsExpendedView";
import RepeatComponent from "../RepeatComponent";

const TopicsToFollow = ({ goBack }: any) => {
  return (
    <>
      <WidgetsExpendedView {...{ title: "Topics to Follow", goBack }}>
        <div className="You-might-like-follow-list">
          <ul>
            <RepeatComponent count={10}>
              {({ i }: any) => (
                <li key={i}>
                  <div className="You-might-like-follow-dp">
                    <img
                      src="/images/business-user1.png"
                      alt="image"
                      className="img-fluid"
                    />
                    <div className="user-vip-tag">
                      <img
                        src="/images/follow-icon.png"
                        alt="icon"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="You-might-like-follow-text-sect">
                    <div className="You-might-like-follow-text">
                      <div className="follow-dp-vip-user-text">
                        <span>
                          <FiUser />
                        </span>
                        <h4>@SunYoo and 3 others follow</h4>
                      </div>
                      <div className="You-might-like-follow-username">
                        <h5>@JaniceHum</h5>
                        <span>Follows you</span>
                      </div>
                      <p>
                        Entrepreneur always eager to learn more and contribute
                        as much as possible into making a better world.{" "}
                        <a href="#!">#crypto</a> beginner &{" "}
                        <a href="#!">#nft</a> creator <a href="#!">#startup</a>{" "}
                        enthusiast
                      </p>
                    </div>
                    <div className="You-might-like-follow-btn ml-2">
                      <button>Follow</button>
                    </div>
                  </div>
                </li>
              )}
            </RepeatComponent>
          </ul>
        </div>
      </WidgetsExpendedView>
    </>
  );
};

export default TopicsToFollow;
