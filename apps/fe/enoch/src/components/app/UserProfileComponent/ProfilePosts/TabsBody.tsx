import React, { useMemo } from "react";
import { userProfileTimelineTabEnums } from "../../../../constants/user-profile-enums";
import Tab from "../../../core/components/Tab";
import Media from "./Media";
import Shop from "../Shop";
import PostAndReplies from "./PostAndReplies";
import Posts from "./Posts";

interface Props {
  activeTab: string;
  isDashboard: boolean;
  setIsDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tabs: any = {
  [userProfileTimelineTabEnums.MEDIA]: Media,
  [userProfileTimelineTabEnums.POST]: Posts,
  [userProfileTimelineTabEnums.POST_AND_REPLIES]: PostAndReplies,
  [userProfileTimelineTabEnums.SHOP]: Shop,
};

const TabsBody = ({
  activeTab,
  isDashboard,

  setIsDashboard,
}: Props) => {
  const ActiveComponent = useMemo(() => Tabs[activeTab], [activeTab]);
  return (
    <>
      <ActiveComponent {...{ isDashboard, setIsDashboard }} />
    </>
  );
};

export default TabsBody;
