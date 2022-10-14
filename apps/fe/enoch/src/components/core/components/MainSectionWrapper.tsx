import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const MainSectionWrapper = ({ children }: Props) => (
  <div className="container my-2">
    <div className="row">{children}</div>
  </div>
);

export default MainSectionWrapper;
