import React from "react";
import classnames from "classnames";
import Widget from "../../core/components/Widgets/Widget";

import {
  TrendingWidget,
  YouMightLikeWidget,
  QuickLinksWidget,
} from "../../core/components/Widgets";

enum TabTypes {
  TRENDING = "trending",
  YOU_MIGHT_LIKE = "youMightLike",
}

interface Props {
  showMore(val: string): void;
  activeComponent: string;
}

const UserProfileWidgets = ({ showMore, activeComponent }: Props) => {
  return (
    <>
      <div
        className={classnames({
          hideElement: activeComponent === TabTypes.TRENDING,
        })}
      >
        <Widget heading="What's happening">
          <TrendingWidget {...{ showMore }} />
        </Widget>
      </div>
      <div
        className={classnames({
          hideElement: activeComponent === TabTypes.YOU_MIGHT_LIKE,
        })}
      >
        <Widget heading="You might like">
          <YouMightLikeWidget {...{ showMore }} />
        </Widget>
      </div>
      <QuickLinksWidget />
    </>
  );
};

export default UserProfileWidgets;
