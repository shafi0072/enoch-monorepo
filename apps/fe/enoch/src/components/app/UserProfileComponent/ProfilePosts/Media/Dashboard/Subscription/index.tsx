import React, { useCallback, useState } from "react";
import Tab from "../../../../../../core/components/Tab";
import MySubscription from "./MySubscription";
import Subscriber from "./Subscriber";

const tabTypes = {
  SUBSCRIBER: "subscriber",
  MY_SUBSCRIPTION: "my_subscription",
};

const tabs = [
  {
    id: 1,
    text: "Subscriber",
    value: "subscriber",
  },
  {
    id: 2,
    text: "My Subscription",
    value: "my_subscription",
  },
];

const Subscription = () => {
  const [activeTab, setActiveTab] = useState(tabTypes.SUBSCRIBER);

  const handleActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="mamage_media_body_content subscription-tags-border mb-0">
      <div className="subscription-header">Subscription</div>
      <div className="tabs-manager-for-subscribers p-0">
        <div className="tab-Hassan-subs mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleActiveTab(tab.value)}
              className={`tablinks_subscriptions ${
                activeTab === tab.value && "active"
              }`}
            >
              {tab.text}
            </button>
          ))}
        </div>

        <Tab {...{ activeComponent: activeTab, tabName: tabTypes.SUBSCRIBER }}>
          <Subscriber />
        </Tab>
        <Tab
          {...{ activeComponent: activeTab, tabName: tabTypes.MY_SUBSCRIPTION }}
        >
          <MySubscription />
        </Tab>
      </div>
    </div>
  );
};

export default Subscription;
