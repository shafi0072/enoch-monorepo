import React from "react";
import classnames from "classnames";

interface Props {
  tabsName: any;
  activeTab: any;
  handleActiveTab: (val: string) => void;
}

const Tabs = ({ tabsName, activeTab, handleActiveTab }: Props) => {
  return (
    <div className="dApp-Posts-tab-sect">
      <div className="dApp-Posts-tab-heading tab p-0">
        {tabsName?.map((tab: any, index: number) => {
          return (
            <button
              key={index}
              onClick={() => handleActiveTab(tab.value)}
              className={classnames(
                "tablinks dApp-Posts-tablinks avex_dapps_tbs_links",
                { active: activeTab === tab.value }
              )}
            >
              {tab.text}
              <div className="dApp-Posts-tab-underline"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
