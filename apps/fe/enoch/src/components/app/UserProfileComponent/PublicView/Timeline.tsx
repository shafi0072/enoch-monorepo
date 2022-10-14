import React from "react";
import AccordionWrapper from "../../../core/lib/bootstrap/Accordion";
import AddExperience from "../AddExperience";
import Interest from "../Interest";
import ProfilePosts from "../ProfilePosts";
import UserInfoCard from "./UserInfoCard";

const TimeLine = () => (
  <>
    <UserInfoCard />
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
