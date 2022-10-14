import React, { forwardRef } from "react";

const DefaultInput = forwardRef((props: any, ref) => {
  return (
    <input
      style={{
        outline: "none",
        backgroundColor: "transparent",
        border: "none",
      }}
      {...props}
      ref={ref}
    />
  );
});

export default DefaultInput;
