import React, { forwardRef } from "react";
import { BsCalendarWeek } from "react-icons/bs";

const DefaultInput = forwardRef((props: any, ref) => {
  return (
    <div className="d-flex align-items-center">
      <input
        style={{
          outline: "none",
          backgroundColor: "transparent",
          border: "none",
          flex: 1,
        }}
        {...props}
        ref={ref}
      />
      <BsCalendarWeek size={22} color="#9B9D9E" />
    </div>
  );
});

export default DefaultInput;
