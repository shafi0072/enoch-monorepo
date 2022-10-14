import React, { useCallback, useMemo, useState } from "react";
import { DrawerWrapper } from "../../../../core/components/DrawerWrapper";
import Rewards from "./Rewards";
import SubscriptionPlan from "./SubscriptionPlan";

enum TabTypes {
  SUBSCRIPTION_PLAN = "subscription_plan",
  REWARDS = "rewards",
}
const Tabs: any = {
  [TabTypes.SUBSCRIPTION_PLAN]: SubscriptionPlan,
  [TabTypes.REWARDS]: Rewards,
};

const MediaSubscription = ({
  isMediaSubscription,
  setIsMediaSubscription,
}: any) => {
  const [activeTab, setActiveTab] = useState<string>(
    TabTypes.SUBSCRIPTION_PLAN
  );
  const ActiveComponent = useMemo(() => Tabs[activeTab], [activeTab]);
  const handleActiveTab = (val: string) => {
    setActiveTab(val);
  };

  return (
    <>
      <DrawerWrapper
        isOpen={isMediaSubscription}
        onClose={() => setIsMediaSubscription(false)}
        activePage={activeTab}
        setPage={setActiveTab}
        indexTab={TabTypes.SUBSCRIPTION_PLAN}
      >
        <ActiveComponent {...{ handleActiveTab }} />
      </DrawerWrapper>
    </>
  );
};

export default MediaSubscription;
