import Link from "next/link";
import React from "react";
import { routes } from "../../../../constants/routes";

const TakeMeToOnboarding = () => {
  return (
    <div className="bg-white onboard-section">
      <div className="onboardWrap">
        <img
          className="margin-t-25 img-fluid"
          src="/images/gilrFrame.png"
          alt="enoch"
        />
        <div className="">
          <span className="desc1">Want to see the onboarding steps again?</span>
        </div>
      </div>

      <Link href={routes.onboarding}>
        <a>
          <button className="onboard-btn">Take me to onboarding</button>
        </a>
      </Link>
    </div>
  );
};

export default TakeMeToOnboarding;
