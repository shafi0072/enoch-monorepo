import React from "react";
interface DropdownWrapperProps {
  children: React.ReactNode;
}

const DropdownWrapper = ({ children }: DropdownWrapperProps) => {
  return <div className="dropdown">{children}</div>;
};

export default DropdownWrapper;
