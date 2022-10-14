import React from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Accordion } from "react-bootstrap";
import AccordionBody from "./AccordionBody";
import AccordionHeader from "./AccordionHeader";

interface AccordianProp {
  header: string;
  children: React.ReactNode;
}

interface AccordionWrapperPros {
  content: AccordianProp[];
  className?: string;
  height?: string;
}

function AccordionWrapper({
  content,
  className,
  height,
}: AccordionWrapperPros) {
  return (
    <SSRProvider>
      <Accordion>
        {content.map((item: AccordianProp, index: number) => (
          <div key={index} className="bg-white mb-2 rounded">
            <AccordionHeader header={item.header} eventKey={index.toString()} />
            <AccordionBody
              height={height}
              children={item.children}
              eventKey={index.toString()}
            />
          </div>
        ))}
      </Accordion>
    </SSRProvider>
  );
}

export default AccordionWrapper;
