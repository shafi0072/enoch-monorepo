import React from "react";
import RepeatComponent from "../RepeatComponent";

const RecentPostsWidget = () => (
  <>
    <div className="dApp-follow-recentPost-block">
      <RepeatComponent count={3}>
        {({ i }: any) => (
          <>
            <div className="dApp-follow-recentPost-item">
              <div className="dApp-follow-recentPost-lft">
                <img
                  src="/images/recentpost-icon.png"
                  className="img-fluid"
                  alt="post"
                />
              </div>
              <div className="dApp-follow-recentPost-right">
                <h2>Title here</h2>
                <p>1 point 0 comments 16 Nov</p>
              </div>
            </div>
          </>
        )}
      </RepeatComponent>
    </div>
    <div className="dApp-recentPost-btn">
      <button className="dApp-recentPost-clear-btn">Clear</button>
    </div>
  </>
);

export default RecentPostsWidget;
