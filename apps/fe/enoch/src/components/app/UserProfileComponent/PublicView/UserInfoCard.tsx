import React, { useCallback, useRef, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { MdOutlineCake, MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import Following from "./Dropdowns/Following";
import MoreActions from "./Dropdowns/MoreActions";
import classnames from "classnames";

const Dropdowns = {
  SHOW_MORE_ACTIONS: "SHOW_MORE_ACTIONS",
  FOLLOW: "FOLLOW",
};

const UserInfoCard = () => {
  const [activeDropdown, setActiveComponent] = useState<string>("");
  const [follow, setFollow] = useState<boolean>(false);
  const impactRef = useRef<any>(null);
  useOutsideClick(impactRef, () => setActiveComponent(""));

  const handleDropdownClick = useCallback(
    (menuName: string) => {
      menuName !== activeDropdown
        ? setActiveComponent(menuName)
        : setActiveComponent("");
    },
    [activeDropdown]
  );

  const handleFollow = useCallback(() => {
    setFollow(true);
    handleDropdownClick(Dropdowns.FOLLOW);
  }, []);

  return (
    <div
      ref={(c) => !!c && (impactRef.current = c)}
      className="dApp-home-cover-And-DP-sect"
    >
      <div style={{ zIndex: "0" }} className="dApp-home-cover-photo">
        <img
          src="/images/userAvtar/changeImg-bg1.png"
          alt="cover-photo"
          className="img-fluid cover-bg-img"
        />
        <div className="onboarding-prof-avatr">
          <div className="onboarding-prof-avatr-pic">
            <div className="userchangeAvImg-overFrame">
              <img
                src="/images/userAvtar/use-ava-img333.png"
                className="img-fluid"
                alt="avatar"
              />
              <p className="userchangeAvImg-others-name">@ALVARo</p>
              <p className="userchangeAvImg-others-bio">
                One hero is attacked:restore the board to the time when this was
                player
              </p>
            </div>
            <span className="userchangeAvImg-avatr userchangeAvImg-card2-img">
              <img
                src="/images/Mask_grl.png"
                className="img-fluid"
                alt="avatar"
              />
            </span>
          </div>
        </div>

        <div className="onboardinguser-top-usrbttns-grp ">
          <ul>
            <li className="userProfileCard-icon">
              <span
                onClick={() => handleDropdownClick(Dropdowns.SHOW_MORE_ACTIONS)}
              >
                <BsThreeDots size={44} />
              </span>
              {activeDropdown === Dropdowns.SHOW_MORE_ACTIONS && (
                <MoreActions />
              )}
            </li>
            <li className="userProfileCard-icon">
              <span>
                <AiOutlineBell size={44} />
              </span>
            </li>
            <li className="userProfileCard-icon">
              <span>
                <HiOutlineMail size={44} />
              </span>
            </li>
            <li className={classnames("onboard-folow", { open: follow })}>
              <button className="onboard-followbtn" onClick={handleFollow}>
                {follow ? "Following" : "Follow"}
              </button>
              {activeDropdown === Dropdowns.FOLLOW && (
                <Following {...{ handleDropdownClick }} />
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="onbording-new-userSect">
        <div className="onbording-new-userSect-hd">
          <h3>@Alvaro Stats</h3>
          <p>
            NFT Creator: Creating fantasy and Blending surreal worlds on the
            Blockchain.{" "}
          </p>
        </div>
        <div className="onbording-new-userSect-info">
          <ul>
            <li>
              <span>
                <MdOutlineLocationOn size={22} color="#8A9099" />
              </span>
              Spain
            </li>
            <li className="deactive">
              <span>
                <HiOutlineGlobeAlt size={22} color="#8A9099" />
              </span>
              Not available
            </li>
            <li>
              <span>
                <FiCalendar size={22} color="#8A9099" />
              </span>
              Joined Sep 2021
            </li>
            <li className="deactive">
              <span>
                <MdOutlineCake size={22} color="#8A9099" />
              </span>
              Not available
            </li>
          </ul>
        </div>
        <div className="onbording-new-userSect-followers">
          <ul>
            <li>
              <span>05</span> Following
            </li>
            <li>
              <span>00</span> Followers
            </li>
          </ul>
          <span className="mutal_app_avex">
            <img className="link_img" src="images/mutual_dapps.svg" alt="" />8
            mutual firends
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
