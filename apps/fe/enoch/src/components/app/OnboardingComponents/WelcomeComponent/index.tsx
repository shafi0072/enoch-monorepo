import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { routes } from "../../../../constants/routes";
import AuthService from "../../../../services/AuthService";

const WelcomeComponent = () => {
  const [isTicketOpen, setIsTicketOpen] = useState<boolean>(true);
  const [isEnochDownloadOpen, setIsEnochDownloadOpen] = useState<boolean>(true);
  const [username, setusername] = useState<string>("");

  const closeTicketPopup = useCallback(() => {
    setIsTicketOpen(false);
  }, []);
  const closeEnochDownloadPopup = useCallback(() => {
    setIsEnochDownloadOpen(false);
  }, []);

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      setusername(user.username);
    }
  }, []);

  return (
    <div className="main welcome-body-bg overflowY">
      <section className="overflowY overflow-auto">
        <div className="ezl-dashboard-container">
          {isTicketOpen && (
            <div className="get-ticket-section">
              <div className="disp-flex">
                <span className="get-ticket-text">
                  Join us for inspiration. Stay for celebration. And get ready
                  for the future of work. Enoch Frontiers is here.
                  <u>Get your ticket</u>
                  <span>
                    {" "}
                    <img
                      className="m-lft-20"
                      src="images/right-arrow.png"
                      alt="img-fluid"
                    />
                  </span>
                </span>
              </div>
              <div>
                <img
                  onClick={closeTicketPopup}
                  src="images/black-cross.png"
                  alt="img-fluid"
                />
              </div>
            </div>
          )}

          <div className="welcome-heading-sec">
            <img
              className="welcome-back-hand"
              src="/images/hand.png"
              alt="img-fluid"
            />
            <h1 className="welcome-heading">Welcome back</h1>
          </div>

          <div className="margin-b-25">
            <div className="enoch-for-section welcome">
              <span className="enoch-for-text welcome">
                Enoch for @{username}
              </span>
            </div>

            <div className="bg-white launch-section">
              <div className="launchWrap">
                <span>
                  <img
                    className="launchWrap-avatar1_Profile"
                    src="images/profile.png"
                    alt="img-fluid"
                  />
                </span>
                <div className="lunchText">
                  <span className="m-lft-20 desc">
                    <span className="counting-clr">150</span>Following
                    <span className="counting-clr m-lft-20">37</span>
                    Followers
                  </span>
                </div>
              </div>
              <Link href={routes.home}>
                <a>
                  <button className="launch-btn welcome">Launch Enoch</button>
                </a>
              </Link>
            </div>
          </div>

          <div className="bg-white onboard-section">
            <div className="onboardWrap">
              <img
                className="margin-t-25"
                src="/images/gilrFrame.png"
                alt="img-fluid"
              />
              <div className="">
                <span className="m-lft-20 desc">
                  Want to see the onboarding steps agains
                </span>
              </div>
            </div>

            <Link href={routes.onboarding}>
              <a>
                <button className="onboard-btn">Take me to Onboarding</button>
              </a>
            </Link>
          </div>

          <p className="not-seeing-text">
            Not seeing your Enoch? Try using a diffrent email address
          </p>

          {isEnochDownloadOpen && (
            <div className="enoch-bg enoch-mac-section">
              <img
                onClick={closeEnochDownloadPopup}
                className="closeIcon"
                src="/images/close.png"
              />
              <div className="EnochMain">
                <img
                  className="downloadIcon"
                  src="/images/Enoch-download.png"
                  alt="img-fluid"
                />
                <div className="m-lft-20 enochTextWrap">
                  <span className="enoch-mac-text">Enoch on Mac</span>
                  <p className="desc">
                    Launch Enoch from your dock and stay up to date with desktop
                    notifications.
                  </p>
                </div>
              </div>
              <div className="downloadButton">
                <button className="text-white align-self-center download-link">
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* <!-- samll components section --> */}
    </div>
  );
};

export default WelcomeComponent;
