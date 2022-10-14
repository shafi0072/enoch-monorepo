import React from "react";
import { WidgetWrapper } from "../../../../core";
import {
  EventsWidget,
  TopicsToFollowWidget,
  TrendingWidget,
  YouMightLikeWidget,
} from "../../../../core/components/Widgets";
import CommunityWidget from "../../../../core/components/Widgets/CommunityWidget";
import RecentPostsWidget from "../../../../core/components/Widgets/RecentPostWidget";
import Widget from "../../../../core/components/Widgets/Widget";

interface Props {
  showMore?: (val: string) => void;
}

const Widgets = ({ showMore }: Props) => (
  <>
    <WidgetWrapper>
      <Widget heading="What's happening">
        <TrendingWidget {...{ showMore }} />
      </Widget>
    </WidgetWrapper>

    <WidgetWrapper>
      <Widget heading="You might like">
        <YouMightLikeWidget {...{ showMore }} />
      </Widget>
    </WidgetWrapper>

    <WidgetWrapper>
      <Widget heading="Topixs to follow">
        <TopicsToFollowWidget {...{ showMore }} />
      </Widget>
    </WidgetWrapper>

    <WidgetWrapper>
      <Widget heading="Events" addIcon="/images/dAppPlus.png">
        <EventsWidget {...{ showMore }} />
      </Widget>
    </WidgetWrapper>

    <WidgetWrapper>
      <Widget heading="Community" addIcon="/images/dAppPlus.png">
        <CommunityWidget {...{ showMore }} />
      </Widget>
    </WidgetWrapper>

    <WidgetWrapper>
      <Widget heading="Recent Post" addIcon="/images/dAppPlus.png">
        <RecentPostsWidget />
      </Widget>
    </WidgetWrapper>
  </>
);

export default Widgets;
