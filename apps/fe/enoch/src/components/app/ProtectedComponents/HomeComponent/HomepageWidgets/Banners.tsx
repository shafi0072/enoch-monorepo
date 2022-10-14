import React from "react";
import { WidgetWrapper } from "../../../../core";

interface Props {
  imgURL?: string;
  shortDes?: string;
  buttonText?: string;
}

const Banners = () => {
  return (
    <>
      <WidgetWrapper>
        <div className="dApp-new-banner-sect1">
          <img
            src="/images/onboard-banners.png"
            alt="Banner"
            className="img-fluid"
          />
          <div className="dApp-new-banner-content-sect">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididun
            </p>
            <div>
              <button className="dApp-unlockClub-btn">Unlock VIP cLUB</button>
            </div>
          </div>
        </div>
      </WidgetWrapper>

      <WidgetWrapper>
        <div className="dApp-daily-bonous-Banner-sect">
          <img
            src="/images/daily-bonous-banner.png"
            alt="Banner"
            className="img-fluid"
          />
          <div className="dApp-playNow">
            <button className="dApp-playnow-btn">
              <img
                src="/images/PlayNow.png"
                className="img-fluid"
                alt="bet now"
              />
            </button>
          </div>
        </div>
      </WidgetWrapper>

      <WidgetWrapper>
        <div className="dApp-daily-bonous-Banner-sect">
          <img
            src="/images/daily-bonous-banner.png"
            alt="Banner"
            className="img-fluid"
          />
          <div className="dApp-playNow">
            <button className="dApp-playnow-btn">
              <img
                src="/images/PlayNow.png"
                className="img-fluid"
                alt="bet now"
              />
            </button>
          </div>
        </div>
      </WidgetWrapper>

      <WidgetWrapper>
        <div className="dApp-home-Create-Post-sect">
          <h1>Home</h1>
          <p>
            Your personal Enoch frontpage. Comehere to check in with your
            favorite communication.
          </p>
          <div className="dApp-home-Create-Post-btn-sect">
            <button className="Create-Post-btn">Create Post</button>
            <button
              className="Create-Community-btn"
              data-toggle="modal"
              data-target="#CreateCommunity-Modal"
            >
              Create Community
            </button>
          </div>
        </div>
      </WidgetWrapper>
    </>
  );
};

export default Banners;
