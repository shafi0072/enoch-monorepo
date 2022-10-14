import React, { ReactNode } from "react";
import { BsArrowLeft } from "react-icons/bs";

interface Props {
  title: string;
  children: ReactNode;
  goBack(): void;
}

const WidgetsExpendedView = ({ title, children, goBack }: Props) => {
  return (
    <>
      <div className="home-post-mid-show-more-sect mt-0 d-block">
        <div className="home-post-mid-show-more-content">
          <div className="home-post-mid-show-more-headings">
            <span onClick={goBack} className="close-show-more-content">
              <BsArrowLeft />
            </span>
            <h2>{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default WidgetsExpendedView;
