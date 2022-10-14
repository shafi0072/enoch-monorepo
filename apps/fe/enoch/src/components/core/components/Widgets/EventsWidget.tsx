import React from "react";
import SeeMore from "./SeeMore";

interface Props {
  showMore?: (val: string) => void;
}

const EventsWidget = ({ showMore }: Props) => (
  <>
    <ul>
      <li>
        <div className="dApp-follow-evnts-lft">uxdesign</div>
        <div className="dApp-follow-evnts-right live-clr">Live</div>
      </li>
      <li>
        <div className="dApp-follow-evnts-lft">hashtaguserexperience</div>
        <div className="dApp-follow-evnts-right upcoming-clr">Upcoming</div>
      </li>
      <li>
        <div className="dApp-follow-evnts-lft">hashtagdesign</div>
        <div className="dApp-follow-evnts-right live-clr">Live</div>
      </li>
    </ul>
    <SeeMore {...{ showMore, value: "events" }} />
  </>
);

export default EventsWidget;
