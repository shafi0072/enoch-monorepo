import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { routes } from "../../../../constants/routes";

const UserInfo = () => {
  const router = useRouter();

  const launchEnoch = useCallback(() => {
    router.replace(routes.home);
  }, []);
  return (
    <>
      <div className="enoch-for-sec">
        <span className="enoch-for-text">Enoch for @hulk66</span>
      </div>
      <div className=" follower-sec">
        <div className="followerWrap">
          <span className="pro_enoch">
            <img src="/images/profile.png" alt="enoch" className="img-fluid" />
          </span>
          <div className="follower">
            <span className="m-lft-20 desc ">
              <span className="enoch-colorno">05</span> Following
            </span>
          </div>
          <div className="follower">
            <span className="m-lft-20 desc ">
              <span className="enoch-colorno">00</span> Followers
            </span>
          </div>
        </div>
        <button onClick={launchEnoch} className="launch-btn">
          Launch Enoch
        </button>
      </div>
    </>
  );
};

export default UserInfo;
