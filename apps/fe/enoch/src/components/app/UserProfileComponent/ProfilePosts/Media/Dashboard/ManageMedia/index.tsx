import React from "react";
import Chart from "./Chart";
import { cards, cardTypes } from "./cards";
import PerformanceCard from "./PerformanceCard";

interface Props {
  handleActiveBoard(val: string): void;
}

const ManageMedia = ({ handleActiveBoard }: Props) => {
  return (
    <div className="mamage_media_modal_body_content">
      <h2>Manage Media</h2>
      <div className="mamage_media_dhashboard_sect">
        <Chart />
        <PerformanceCard />
      </div>

      <div className="manage_media_buttons_sect">
        <ul>
          {cards.map((card: cardTypes) => (
            <li key={card.id} onClick={() => handleActiveBoard(card.value)}>
              <div className="manage_media_btn">
                <button id="pay_per_view">
                  <span>{card.subTitle}</span>
                  {card.title}
                </button>
                <span className="manage_media_btn_shape">
                  <img
                    src="/images/manage_media_btn_shape.png"
                    alt=""
                    className="img-fluid"
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageMedia;
