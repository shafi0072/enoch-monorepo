import React from "react";

interface Props {
  handleAction(val: string): void;
  actions: any;
}

const ActionCard = ({ handleAction, actions }: Props) => {
  return (
    <div className="media_table_menu_droplist d-block">
      <ul>
        <li onClick={() => handleAction(actions.EDIT)} className="edit_media">
          Edit
        </li>
        <li
          onClick={() => handleAction(actions.DELETE)}
          className="delete_media"
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default ActionCard;
