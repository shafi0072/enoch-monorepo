import React, { useCallback, useState } from "react";
import ActionCard from "./ActionCard";
import Dialog from "./Dialog";
import AlertBox from "./Dialog";

interface Props {
  item: any;
  setIsEdit: any;
}

const actions = {
  EDIT: "edit",
  DELETE: "delete",
};

const Item = ({ item, setIsEdit }: Props) => {
  const [isAction, setIsAction] = useState<boolean>(false);
  const [action, setAction] = useState<string>(actions.EDIT);

  const showActions = useCallback(() => {
    setIsAction((prev) => !prev);
  }, []);

  const handleAction = useCallback((action: string) => {
    setIsEdit(action === actions.EDIT);
    setAction(action);
    showActions();
  }, []);

  const closeDialog = useCallback(() => {
    setAction("");
  }, []);

  return (
    <>
      <li className="table_checkbox">
        <div className="manage_media_check_box">
          <label className="container">
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
      </li>
      <li className="media">
        <span>
          <img src="/images/media_img_1.png" alt="" className="img-fluid" />
        </span>
      </li>
      <li className="title">My Journey, My Life</li>
      <li className="file_name">journey.mp4</li>
      <li className="category">Spritual</li>
      <li className="privacy_type">Premium Content</li>
      <li className="media_table_menu ">
        <span className="mr-2">
          <img
            src="/images/table_deta_copy_icon.svg"
            alt=""
            className="img-fluid"
          />
        </span>
        <span onClick={showActions} className="media_table_menu_btn ml-2">
          <img src="/images/table_menu_icon.svg" alt="" className="img-fluid" />
        </span>
        {isAction && <ActionCard {...{ handleAction, actions }} />}
        {action === actions.DELETE && (
          <Dialog
            {...{
              closeDialog,
              message: "Are you sure you want to delete the media.",
              title: "Are you sure?",
            }}
          />
        )}
      </li>
    </>
  );
};

export default Item;
