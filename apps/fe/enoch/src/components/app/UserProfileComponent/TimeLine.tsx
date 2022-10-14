import React from "react";
import AccordionWrapper from "../../core/lib/bootstrap/Accordion";
import AddExperience from "./AddExperience";
import Interest from "./Interest";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import ProfileStats from "./ProfileStats";

const TimeLine = () => (
  <>
    <ProfileInfo />
    <ProfileStats />
    <AccordionWrapper
      height="400px"
      content={[
        {
          header: "Interest",
          children: <Interest />,
        },
        {
          header: "Experience",
          children: <AddExperience isOwnProfile />,
        },
      ]}
    />
    <ProfilePosts isOwnProfile />
  </>
);

export default TimeLine;
