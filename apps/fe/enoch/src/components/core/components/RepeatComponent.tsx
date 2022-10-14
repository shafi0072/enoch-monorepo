import React from "react";

interface Props {
  count: number;
  children: any;
}

const RepeatComponent = ({ count, children }: Props) => (
  <>
    {Array(count)
      .fill(null)
      .map((_, index) => (
        <>{children({ index })}</>
      ))}
  </>
);

export default RepeatComponent;
