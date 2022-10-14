import React, { useEffect } from "react";

const useOverflow = (isOpen: any) => {
  useEffect(() => {
    if (isOpen) {
      document.body.className = "overflow-hidden";
    } else {
      document.body.className = "overflow-auto";
    }
  }, [isOpen]);
  return null;
};

export default useOverflow;
