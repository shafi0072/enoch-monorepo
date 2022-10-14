import React from "react";

const CreatePoll = () => {
  return (
    <div id="Poll" className="posttabcontent">
      <h2 className="posting-step-hd-title current">Create a poll</h2>
      <div className="posting-steps-poll">
        <form>
          <div className="steps-poll-input-grp">
            <div className="poll-input-label">Your question</div>
            <div className="poll-input-field">
              <input
                type="text"
                placeholder="E.g., How do you commute to work?"
              />
            </div>
          </div>
          <div className="steps-poll-input-grp">
            <div className="poll-input-label">Option 1*</div>
            <div className="poll-input-field">
              <input type="text" placeholder="E.g., Public trasportation" />
            </div>
          </div>
          <div className="steps-poll-input-grp">
            <div className="poll-input-label">Option 2*</div>
            <div className="poll-input-field">
              <input type="text" placeholder="E.g., Drive myself" />
            </div>
          </div>
          <div className="step-poll-addOption">
            <a href="#!" className="btn poll-addOption-btn">
              + Add Options
            </a>
          </div>
          <div className="steps-poll-input-grp steps-poll-input-option-extra">
            <div className="poll-input-label">
              Option 3* <span className="poll-option-extra-remove">Remove</span>
            </div>
            <div className="poll-input-field">
              <input type="text" placeholder="E.g.,Go with my friends" />
            </div>
          </div>
          <div className="steps-poll-input-grp steps-poll-input-option-extra">
            <div className="poll-input-label">
              Option 4* <span className="poll-option-extra-remove">Remove</span>
            </div>
            <div className="poll-input-field">
              <input type="text" placeholder="E.g., by Cyceling" />
            </div>
          </div>
          <div className="steps-poll-input-grp Poll-duration-dropdown">
            <div className="poll-input-label">Poll duration</div>
            <div className="event-form-input dropdown">
              <div
                id="postPoll-dropdown"
                className="postPoll-dropdown-input"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                1 Week
              </div>
              <div
                id="postPoll-dropList"
                className="dropdown-menu Poll-duration-drop-box"
              >
                <ul>
                  <li>1 Day</li>
                  <li>3 Days</li>
                  <li>1 Week</li>
                  <li className="no-border">2 Weeks</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="poll-bottm-txt">
            We don’t allow requests for political opinions, medical information
            or other sensitive data.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
