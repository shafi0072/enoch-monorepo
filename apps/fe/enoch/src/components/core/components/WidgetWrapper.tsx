import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const WidgetWrapper = ({ children }: Props) => {
  return <div style={{ marginBottom: "16px" }}>{children}</div>;
};
