import React from "react";
import SeeMore from "./SeeMore";

interface Props {
  showMore?: (val: string) => void;
}

const TrendingWidget = ({ showMore }: Props) => (
  <>
    <div className="dApp-What-happening-news-sect">
      <div className="dApp-What-happening-news">
        <div className="dApp-What-happening-news-text">
          <h2>
            News . <span>2 minutes ago</span>
          </h2>
          <p>
            Looking at the claim that discourse around ‘White Previlege’ can
            hamper white working class students.
          </p>
        </div>
        <div className="dApp-What-happening-news-photo">
          <img
            src="/images/dApp-news-pic-1.png"
            alt="photo"
            className="img-fluid"
          />
        </div>
      </div>
      <h6>
        Treanding with <a href="#!">#WhitePrevilege</a>
      </h6>
      <div className="dApp-Trending-United-Kingdom-sect">
        <h1>Trending in United Kingdom</h1>
        <a href="#!">#CryptoCash</a>
        <p>17.1K Pinned</p>
        <div className="dApp-Trending-United-Kingdom-3dots">
          <img
            src="images/dApp-ThreeDots.png"
            alt="3Dots"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
    <SeeMore {...{ showMore, value: "trending" }} />
  </>
);
export default TrendingWidget;
