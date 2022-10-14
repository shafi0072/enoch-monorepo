import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  closeActiveComponent: () => void;
}
const SectionWrapper = ({ children, closeActiveComponent }: Props) => {
  return (
    <div id="Image" className="add_attachment_tab_tabcontent d-block">
      <div className="Image-tab-sect">
        <span className="Image-tab-sect-close" onClick={closeActiveComponent}>
          <img src="/images/Cross.svg" alt="icon" className="img-fluid" />
        </span>
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
