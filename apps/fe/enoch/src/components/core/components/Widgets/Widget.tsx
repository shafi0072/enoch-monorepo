import React, { ReactNode } from "react";
import WidgetHeadline from "./WidgetHeadline";

interface Props {
  children: ReactNode;
  heading?: string;
  addIcon?: string;
}

const Widget = ({ children, heading, addIcon }: Props) => (
  <div className="dApp-follow-evnts mt-0">
    <WidgetHeadline {...{ heading, addIcon }} />
    {children}
  </div>
);

export default Widget;
