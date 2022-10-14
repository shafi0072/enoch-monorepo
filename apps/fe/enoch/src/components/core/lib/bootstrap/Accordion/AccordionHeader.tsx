import { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";
import { HiMinus, HiPlus } from "react-icons/hi";
import styles from "../ComponentClasses.module.css";

interface AccordionHeaderProps {
  header?: string;
  eventKey: string;
}

const AccordionHeader = ({ header, eventKey }: AccordionHeaderProps) => {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div
      onClick={decoratedOnClick}
      className={`d-flex align-items-center justify-content-between w-full bg-white p-3 ${styles.cursor}`}
    >
      <h1 className={styles.accordianHeader}>{header}</h1>
      {activeEventKey === eventKey ? (
        <HiMinus size={20} color="#7521E2" />
      ) : (
        <HiPlus size={20} color="#8A9099" />
      )}
    </div>
  );
};

export default AccordionHeader;
