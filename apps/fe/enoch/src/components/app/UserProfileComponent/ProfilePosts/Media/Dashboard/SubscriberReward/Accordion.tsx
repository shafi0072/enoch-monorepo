import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useToggleComponent from "../../../../../../../hooks/useToggleComponent";

interface Props {
  heading: string;
  children: ReactNode;
}
const Accordion = ({ heading, children }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const ArrowElement = useToggleComponent(
    isActive,
    IoIosArrowDown,
    IoIosArrowUp
  );
  return (
    <div className="main-section-scroll">
      <div className={classnames("faq-subs-reward", { active: isActive })}>
        <h3
          onClick={() => setIsActive((prev) => !prev)}
          className="faq-title justify-content-between"
        >
          {heading}
          <span>
            {isActive ? (
              <IoIosArrowUp className="text-indigo w-10" />
            ) : (
              <IoIosArrowDown />
            )}
          </span>
        </h3>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
