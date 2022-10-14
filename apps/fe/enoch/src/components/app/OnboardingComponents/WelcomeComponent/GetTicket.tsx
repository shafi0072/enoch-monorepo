import React from "react";

const GetTicket = () => {
  return (
    <div className="get-ticket-section">
      <div className="disp-flex">
        <span className="get-ticket-text">
          Join us for inspiration. Stay for celebration. And get ready for the
          future of work. Enoch Frontiers is here.
          <u>Get your ticket</u>
          <span>
            <img
              className="m-lft-20"
              src="images/right-arrow.png"
              alt="img-fluid"
            />
          </span>
        </span>
      </div>
      <div>
        <img src="images/black-cross.png" alt="img-fluid" />
      </div>
    </div>
  );
};

export default GetTicket;
