import classNames from "classnames";
import React from "react";

type infoTypes = {
  id: number;
  title: string;
  value: number;
  class_name: string;
};

const pieInfos: infoTypes[] = [
  {
    id: 1,
    title: "Pay per view",
    value: 50,
    class_name: "view",
  },
  {
    id: 2,
    title: "Subscriptions",
    value: 25,
    class_name: "subscriptions",
  },
  {
    id: 3,
    title: "Subscriber",
    value: 250,
    class_name: "subscriber",
  },
  {
    id: 4,
    title: "Total Views",
    value: 50,
    class_name: "total_views",
  },
];

const PerformanceCard = () => {
  return (
    <div className="mamage_media_dhashboard_right">
      <div className="mamage_media_dhashboard_right_card">
        <h3>Last 30 Days Performance</h3>
        <div className="mamage_media_dhashboard_pichart text-center">
          <span>
            <img src="/images/media_pichart.png" alt="" className="img-fluid" />
          </span>
        </div>
        <div className="mamage_media_dhashboard_pichart_list">
          <ul>
            {pieInfos.map((info: infoTypes) => (
              <li key={info.id}>
                <div
                  className={classNames(`pi_info_icon ${info.class_name}`)}
                ></div>
                <div className="mamage_media_dhashboard_pichart_list_text">
                  <h5>{info.title}</h5>
                  <h6>{info.value}</h6>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
