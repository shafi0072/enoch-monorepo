import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { routes } from "../../../../constants/routes";
import AuthService from "../../../../services/AuthService";

const WelcomeUser = () => {
  const [username, setusername] = useState<string>("");
  const router = useRouter();

  const launchEnoch = useCallback(() => {
    router.push(routes.home);
  }, []);

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      setusername(user.username);
    }
  }, []);
  console.log(username);
  return (
    <div className="main welcome-body-bg">
      <section className="overflow-auto">
        <div className="ezl-dashboard-container">
          <div className="get-ticket-section">
            <div className="disp-flex">
              <span className="get-ticket-text">
                Join us for inspiration. Stay for celebration. And get ready for
                the future of work. Enoch Frontiers is here.
                <u>Get your ticket</u>
                <span>
                  {" "}
                  <img
                    className="m-lft-20"
                    src="/images/right-arrow.png"
                    alt="img-fluid"
                  />
                </span>
              </span>
            </div>
            <div>
              <img src="/images/black-cross.png" alt="img-fluid" />
            </div>
          </div>

          <div className="welcome-heading-sec">
            <img src="/images/hand.png" alt="img-fluid" />
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
                    src="/images/profile.png"
                    alt="img-fluid"
                  />
                </span>
                <div className="lunchText">
                  <span className="m-lft-20 desc">
                    <span className="counting-clr">150</span>Following
                    <span className="counting-clr ml-2">37</span>
                    Followers
                  </span>
                </div>
              </div>
              <button className="launch-btn welcome" onClick={launchEnoch}>
                Launch Enoch
              </button>
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
                  Want to see the onpabding steps agains
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push(routes.personalInformation)}
              className="onboard-btn"
            >
              Take me to Onboarding
            </button>
          </div>

          <p className="not-seeing-text">
            Not seeing your Enoch? Try using a diffrent email address
          </p>

          <div className="enoch-bg enoch-mac-section">
            <img className="closeIcon" src="/images/close.png" />
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
        </div>
      </section>
    </div>
  );
};

export default WelcomeUser;
