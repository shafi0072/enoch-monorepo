import React from "react";

interface Props {
  actions: any;
}
const ActionCard = ({ actions }: Props) => {
  return (
    <>
      <ul className="same-menuitem">
        {actions.map((action: any) => (
          <li onClick={action.id} className="same-list-tag">
            <span>{action.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ActionCard;
