import React from "react";

interface Props {
  count: number;
  children: any;
}

const RepeatElement = ({ count, children }: Props) => (
  <>
    {Array(count)
      .fill(null)
      .map((_, index) => (
        <>{children({ index })}</>
      ))}
  </>
);

export default RepeatElement;
