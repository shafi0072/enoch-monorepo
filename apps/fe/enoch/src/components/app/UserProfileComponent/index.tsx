import { FC, useCallback, useMemo, useState } from "react";
import Header from "../../app/ProtectedComponents/HeaderComponent";
import Banners from "../ProtectedComponents/HomeComponent/HomepageWidgets/Banners";
import TimeLine from "./TimeLine";
import {
  Community,
  Events,
  TopicsToFollow,
  Trending,
  YouMightLike,
} from "../../core/components/ShowMoreViews";
import UserProfileWidgets from "./UserProfileWidgets";

enum TabTypes {
  TIMELINE = "timeline",
  TRENDING = "trending",
  YOU_MIGHT_LIKE = "youMightLike",
  EVENTS = "events",
  COMMUNITY = "community",
  TOPICS_TO_FOLLOW = "topicsToFollow",
}

const Tabs: any = {
  [TabTypes.TIMELINE]: TimeLine,
  [TabTypes.TRENDING]: Trending,
  [TabTypes.YOU_MIGHT_LIKE]: YouMightLike,
  [TabTypes.EVENTS]: Events,
  [TabTypes.COMMUNITY]: Community,
  [TabTypes.TOPICS_TO_FOLLOW]: TopicsToFollow,
};

const UserProfileComponent: FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>(
    TabTypes.TIMELINE
  );
  const showMore = useCallback((val: string) => {
    setActiveComponent(val);
  }, []);
  const goBack = useCallback(() => {
    setActiveComponent(TabTypes.TIMELINE);
  }, []);

  const ActiveComponent = useMemo(
    () => Tabs[activeComponent],
    [activeComponent]
  );

  return (
    <div className="dashboard-body-bg second-body-bg">
      <div className="row m-0">
        <Header />
        <div className="container my-2 ">
          <div className="d-md-flex justify-content-center">
            <div>
              <Banners />
            </div>
            <div
              style={{
                maxWidth: "600px",
              }}
              className="mx-auto mx-sm-4 mb-2 mt-0 d-flex flex-column gap-2"
            >
              <ActiveComponent {...{ goBack }} />
            </div>
            <div>
              <UserProfileWidgets {...{ showMore, activeComponent }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;
