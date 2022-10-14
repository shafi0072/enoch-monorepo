import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import TooltipSlider, { handleRender } from "./TooltipSlider";

interface Props {
  min: number;
  max: number;
  start?: number;
  width?: string;
  value?: any;
  handler: any;
}
const RangeInput = ({ width="318px", ...rest }: Props) => {
  
  return (
    <Slider
      handleRender={handleRender}
      style={{ width }}
      {...rest}
      railStyle={{
        height: "10px",
      }}
      handleStyle={{
        height: 20,
        width: 20,
        marginLeft: -5,
        marginTop: -5,
        backgroundColor: "#2bbd54",
        border: 0,
      }}
      trackStyle={{
        background: "#2bbd54",
        height: "10px",
      }}
    />
  );
};

export default RangeInput;
