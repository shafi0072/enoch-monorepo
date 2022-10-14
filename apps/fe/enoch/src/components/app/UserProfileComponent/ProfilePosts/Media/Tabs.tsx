import React from "react";
import classnames from "classnames";

interface Props {
  activeTab: string;
  handleActiveTab(val: string): void;
  tabsName: any;
}

const Tabs = ({ activeTab, handleActiveTab, tabsName }: Props) => (
  <div className="tabs_hearts">
    {tabsName.map((tab: any) => (
      <button
        onClick={() => handleActiveTab(tab.value)}
        className={classnames("tabs_list_hearts avex_tablinks", {
          active: activeTab === tab.value,
        })}
      >
        {tab.value}
      </button>
    ))}
  </div>
);

export default Tabs;
