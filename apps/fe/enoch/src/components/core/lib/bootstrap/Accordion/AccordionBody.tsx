import React from "react";
import { Accordion } from "react-bootstrap";
import styles from "../ComponentClasses.module.css";

interface AccordianBodyProps {
  children: React.ReactNode;
  eventKey: string;
  height?: string;
}

const AccordionBody = ({ children, eventKey, height }: AccordianBodyProps) => {
  return (
    <Accordion.Collapse eventKey={eventKey}>
      <div
        style={{ maxHeight: height }}
        className={`${styles.accordionBody} p-3 pt-0 bg-white overflow-auto`}
      >
        {children}
      </div>
    </Accordion.Collapse>
  );
};

export default AccordionBody;
