import React from "react";

interface Props {
  heading?: string;
  addIcon?: string;
  addIconHandler?: () => void;
}
const WidgetHeading = ({ heading, addIcon, addIconHandler }: Props) => {
  return (
    <div
      className="dApp-What-happeningheadings"
      style={{
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
        paddingBottom: "6px",
      }}
    >
      <h1>{heading}</h1>
      {addIcon && (
        <span>
          <img src={addIcon} alt="" className="img-fluid" />
        </span>
      )}
    </div>
  );
};

export default WidgetHeading;
