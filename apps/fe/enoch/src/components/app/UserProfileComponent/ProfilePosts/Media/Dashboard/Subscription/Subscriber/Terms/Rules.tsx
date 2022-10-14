import React from "react";

interface Props {
  handleActiveTab(val: string): void;
}
const Rules = ({ handleActiveTab }: Props) => {
  return (
    <>
      <div>
        <div className="Rules-understandable-wrap" id="wrap-tree">
          <div className="discription-divs">
            <h2>Rules to Understand</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="agree-terms terminal-term-Checkbox justify-content-start">
            <input type="checkbox" name="" id="" />
            <p className="mb-0">
              By clicking on this, you agree to{" "}
              <strong> Enoch Premium Subscrition Terms</strong> &amp;{" "}
              <strong>Policy</strong>{" "}
            </p>
          </div>

          <div className="footer-buttons">
            <button className="cancel-btn">Cancel</button>
            <button
              onClick={() => handleActiveTab("enable_awards")}
              className="next-btn"
              id="next-subs"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rules;
