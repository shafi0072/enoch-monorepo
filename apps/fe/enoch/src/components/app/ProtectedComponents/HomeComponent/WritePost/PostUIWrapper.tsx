import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PostUIWrapper = ({ children }: Props) => {
  return (
    <>
      <div
        className="posting-steps-tab-sect fontPoppins"
        style={{ display: "block" }}
      >
        <div id="Photo" className="posttabcontent" style={{ display: "block" }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default PostUIWrapper;
