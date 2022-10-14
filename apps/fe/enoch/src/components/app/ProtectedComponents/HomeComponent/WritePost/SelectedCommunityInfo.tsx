import React from "react";

const SelectedCommunityInfo = () => {
  return (
    <div className="posting-steps-spooky">
      <div className="posting-steps-spooky-hd">
        <span>
          <img
            src="/images/spooky-swap.png"
            className="img-fluid"
            alt="spooky"
          />
        </span>
        Spooky Swap
      </div>
      <div className="posting-steps-spooky-content">
        Spooky utilizes the Fantom network to deliver top speed, security, and
        scalable transactions. Your swaps will cost a fraction of a penny.
      </div>
      <div className="posting-steps-membrs-online">
        <div className="posting-steps-membrs-online-lft">
          <h3>Members</h3>
          <p>3.2m</p>
        </div>
        <div className="posting-steps-membrs-online-right">
          <h3>Online</h3>
          <p>5.7k</p>
        </div>
      </div>
      <div className="posting-steps-created">
        <span>
          <img
            src="/images/Birthday.png"
            className="img-fluid"
            alt="Birthday"
          />
        </span>
        Created on 10 july 2021
      </div>
      <div className="posting-steps-tribe-dropbox">
        <a
          href="#!"
          id="tribe-dropbox-list-input"
          className="posting-step-tribe-box"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Community Options
        </a>
        <div
          id="tribe-dropbox-list"
          className="dropdown-menu posting-steps-tribe-dropbox-list"
        >
          <ul>
            <li>Community Options</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectedCommunityInfo;
