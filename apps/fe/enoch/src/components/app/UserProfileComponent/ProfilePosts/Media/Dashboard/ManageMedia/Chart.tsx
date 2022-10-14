import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Chart = () => (
  <div className="mamage_media_dhashboard_left">
    <div className="mamage_media_dhashboard_left_card">
      <div className="mamage_media_dhashboard_left_card_headings">
        <h4>Monthly Views</h4>
        <div className="">
          <button
            className="bg-white border-0"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Jan 2022 <IoMdArrowDropdown />
          </button>
        </div>
      </div>
      <div className="mamage_media_dhashboard_left_graph">
        <ul className="mamage_media_dhashboard_graph_Y">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <li key={i}>{i + 1}00K</li>
            ))}
        </ul>
        <div className="mamage_media_dhashboard_graph_img">
          <span>
            <img
              src="/images/media_graph_img.png"
              alt=""
              className="img-fluid"
            />
          </span>
        </div>
        <ul className="mamage_media_dhashboard_graph_x">
          {Array(31)
            .fill(0)
            .map((_, i) => (
              <li key={i}>{i + 1}</li>
            ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Chart;
