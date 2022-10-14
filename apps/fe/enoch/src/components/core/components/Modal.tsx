import React, { ReactNode, useEffect } from "react";
import useOverflow from "../../../hooks/useOverflow";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  bgColor?: string;
};

export const Modal = ({ children, isOpen, bgColor = "#fff" }: ModalProps) => {
  useOverflow(isOpen);
  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: "1050",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "grid",
            placeItems: "center",
            overflow: "auto",
          }}
        >
          <div
            style={{
              top: 0,
              left: 0,
              zIndex: "1050",
              outline: 0,
              background: bgColor,
              right: 0,
              transition: "-webkit-transform 0.3s ease-out",
              margin: "1.75rem auto",
              position: "relative",
            }}
          >
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
