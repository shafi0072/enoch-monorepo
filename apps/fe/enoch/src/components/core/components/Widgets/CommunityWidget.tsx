import React from "react";
import SeeMore from "./SeeMore";

interface Props {
  showMore?: (val: string) => void;
}

const CommunityWidget = ({ showMore }: Props) => (
  <>
    <ul>
      <li>
        <div className="dApp-follow-evnts-lft">DeFi Signal </div>
        <div className="dApp-follow-evnts-right community-clr">400 members</div>
      </li>
      <li>
        <div className="dApp-follow-evnts-lft">Crypto Process</div>
        <div className="dApp-follow-evnts-right community-clr">
          2.5k members
        </div>
      </li>
      <li>
        <div className="dApp-follow-evnts-lft">Fashion Era</div>
        <div className="dApp-follow-evnts-right community-clr">
          2.5k members
        </div>
      </li>
    </ul>
    <SeeMore {...{ showMore, value: "community" }} />
  </>
);

export default CommunityWidget;
