import React, { useCallback, useMemo, useState } from "react";
import Tab from "../../../../../../../../core/components/Tab";
import EnableAwards from "./EnableAwards";
import Rules from "./Rules";
import SubscriptionFee from "./SubscriptionFee";

enum steps {
  RULES = "rules",
  ENABLE_AWARDS = "enable_awards",
  SUBSCRIPTION_FEE = "subscription_fee",
}

interface Props {
  showSubscriber(): void;
}

const Tabs: any = {
  [steps.RULES]: Rules,
  [steps.ENABLE_AWARDS]: EnableAwards,
  [steps.SUBSCRIPTION_FEE]: SubscriptionFee,
};

const Terms = ({ showSubscriber }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(steps.RULES);

  const handleActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const ActiveComponent = useMemo(() => Tabs[activeTab], [activeTab]);
  return (
    <>
      <div>
        <div>
          <img src="/images/tags-sub-pic.png" alt="" className="img-fluid" />
        </div>
        <Tab {...{ activeComponent: activeTab, tabName: steps.RULES }}>
          <Rules {...{ handleActiveTab }} />
        </Tab>
        <Tab {...{ activeComponent: activeTab, tabName: steps.ENABLE_AWARDS }}>
          <EnableAwards {...{ handleActiveTab }} />
        </Tab>
        <Tab
          {...{ activeComponent: activeTab, tabName: steps.SUBSCRIPTION_FEE }}
        >
          <SubscriptionFee {...{ showSubscriber }} />
        </Tab>
      </div>
    </>
  );
};

export default Terms;
