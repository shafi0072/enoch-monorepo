import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { routes } from "../../../../constants/routes";
import { Button } from "../../../core/index";

const imagesList = [
  "/images/avatar/avatr-pic1.png",
  "/images/avatar/avatr-pic6.png",
  "/images/avatar/avatr-pic11.png",
  "/images/avatar/avatr-pic16.png",
  "/images/avatar/avatr-pic2.png",
  "/images/avatar/avatr-pic7.png",
  "/images/avatar/avatr-pic12.png",
  "/images/avatar/avatr-pic17.png",
  "/images/avatar/avatr-pic3.png",
  "/images/avatar/avatr-pic8.png",
  "/images/avatar/avatr-pic13.png",
  "/images/avatar/avatr-pic18.png",
  "/images/avatar/avatr-pic4.png",
  "/images/avatar/avatr-pic9.png",
  "/images/avatar/avatr-pic14.png",
  "/images/avatar/avatr-pic19.png",
  "/images/avatar/avatr-pic5.png",
  "/images/avatar/avatr-pic10.png",
  "/images/avatar/avatr-pic15.png",
  "/images/avatar/avatr-pic20.png",
];

const ChooseAvatarComponent: React.FC = () => {
  const router = useRouter();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="onboarding-new-container container-bg2">
          <div className="onboard-individual-body">
            <div className="onboard-business-logo">
              <img
                src="/images/businessNewLogo.png"
                className="img-fluid"
                alt="logo"
              />
            </div>
            <div className="onboard-business-bottm-img">
              <img
                src="/images/business-img.png"
                className="img-fluid"
                alt="logo"
              />
            </div>

            <div className="onboard-business-innerbody">
              <div className="onboard-business-progressBlock">
                <div className="onboard-business-progressbar">
                  <div className="onboard-business-progressbar-inner progress-100"></div>
                </div>
                <div className="onboard-business-bottmVal">
                  <Link href={routes.newsLetterSuggestionPage}>
                    <a>
                      <span>
                        <img
                          src="/images/back-arrow.png"
                          className="img-fluid mr-2"
                          alt="back"
                        />
                        GO BACK
                      </span>
                    </a>
                  </Link>
                  <div className="onboarding-progress-step-count">
                    <strong>5</strong>
                    <span>/5</span>
                  </div>
                </div>
              </div>

              <div className="onboard-business-chooseAv-block">
                <div className="onboard-business-chooseAv-left">
                  <div className="onboard-business-hd">
                    <h2>Choose your avatar</h2>
                    <p>Create mind blowing profile in a flash!</p>
                  </div>
                  <h3>Create mind blowing profile in a flash!</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div className="business-avatar-gal">
                  <ul>
                    {imagesList.map((image, index) => (
                      <li key={index}>
                        <img src={image} className="img-fluid" alt="avatar" />
                      </li>
                    ))}
                  </ul>
                  <div className="avatar-gal-overlay">
                    HELLO
                    <br /> GET YOUR
                    <br /> AVATAR
                  </div>
                </div>
              </div>
              <div className="onboard-busines-nxt">
                <Button
                  className="bunsinss-nxt-bttn"
                  text="Next"
                  type="button"
                  handler={() => router.push("/onboarding/onboarding-profile")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAvatarComponent;
