import React, { useCallback, useState } from "react";
import ActionCard from "./Subscriber/ActionCard";

interface Props {
  actions: any;
}
const Item = ({ actions }: Props) => {
  const [isAction, setIsAction] = useState<boolean>(false);

  const showActions = useCallback(() => {
    setIsAction((prev) => !prev);
  }, []);
  return (
    <>
      <tr className="user-tablebody-row">
        <td>
          <div className=" terminal-term-Checkbox">
            <input type="checkbox" name="" id="" />
          </div>
        </td>
        <td>
          <div className="user-define">
            <img className="w-25" src="/images/Ellipse_hlvin.png" alt="" />
            <p>@JaniceHum</p>
          </div>
        </td>
        <td>
          <p className="number-media">04/05/2022</p>
        </td>
        <td>
          <p className="number-media">100 Media</p>
        </td>
        <td>
          <p className="random-col-war">Subscribed</p>
        </td>
        <td>
          <div className="dropdown-daats open">
            <div
              onClick={showActions}
              className="shine-staff "
              id="shots-of-day"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="pop-divi-dots"></div>
              <div className="pop-divi-dots"></div>
              <div className="pop-divi-dots"></div>
            </div>
            {isAction && <ActionCard {...{ actions }} />}
          </div>
        </td>
      </tr>
    </>
  );
};

export default Item;
