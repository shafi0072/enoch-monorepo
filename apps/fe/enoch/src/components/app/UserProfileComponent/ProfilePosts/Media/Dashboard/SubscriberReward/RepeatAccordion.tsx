import React, { ReactNode } from "react";

interface Props {
  count: number;
  children: ReactNode;
}

const RepeatAccordion = ({ count, children }: Props) => (
  <>
    {Array(count)
      .fill(null)
      .map((_, i) => (
        <>{children}</>
      ))}
  </>
);

export default RepeatAccordion;
