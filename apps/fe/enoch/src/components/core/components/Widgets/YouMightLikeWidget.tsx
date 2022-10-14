import React from "react";
import RepeatComponent from "../RepeatComponent";
import SeeMore from "./SeeMore";

interface Props {
  showMore?: (val: string) => void;
}

const YouMightLikeWidget = ({ showMore }: Props) => (
  <>
    <RepeatComponent count={3}>
      {({ i }: any) => (
        <>
          <div key={i} className="dApp-Who-to-follow">
            <div className="dApp-Who-to-follow-content">
              <div className="dApp-Who-to-follow-dp">
                <img
                  src="/images/userAvatar4.png"
                  alt="photo"
                  className="img-fluid"
                />
              </div>
              <ul>
                <li className="profile-name">@djirridiant </li>
                <li className="Promoted">
                  <span>
                    <img
                      src="/images/External-Link.png"
                      alt="icon"
                      className="img-fluid"
                    />
                  </span>
                  Promoted
                </li>
              </ul>
            </div>
            <div className="dApp-Who-to-follow-btn">
              <button>Follow</button>
            </div>
          </div>
        </>
      )}
    </RepeatComponent>
    <SeeMore {...{ showMore, value: "youMightLike" }} />
  </>
);

export default YouMightLikeWidget;
