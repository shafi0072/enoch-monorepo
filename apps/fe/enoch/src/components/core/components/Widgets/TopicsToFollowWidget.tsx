import React from "react";
import RepeatComponent from "../RepeatComponent";

import SeeMore from "./SeeMore";

interface Props {
  showMore?: (val: string) => void;
}

const TopicsToFollowWidget = ({ showMore }: Props) => {
  return (
    <>
      <RepeatComponent count={3}>
        {({ i }: any) => (
          <>
            <div key={i} className="dApp-Topics-to-follow">
              <div className="dApp-Topics-to-follow-content">
                <h2>Cricket </h2>
                <h3>Sport</h3>
              </div>
              <div className="dApp-Who-to-follow-btn">
                <button>Follow</button>
              </div>
            </div>
          </>
        )}
      </RepeatComponent>
      <SeeMore {...{ showMore, value: "topicsToFollow" }} />
    </>
  );
};

export default TopicsToFollowWidget;
