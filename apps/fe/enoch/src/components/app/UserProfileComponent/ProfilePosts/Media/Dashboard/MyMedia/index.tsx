import React, { useState } from "react";
import EmptyMedia from "./EmptyMedia";
import Item from "./Item";
import UpdateItem from "./UpdateItem";

const rows = {
  MEDIA: "Media",
  TITLE: "Title",
  FILE_NAME: "File name",
  CATEGORY: "Category",
  PRIVACY_TYPE: "Privacy type",
};

const MyMedia = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const arr = Array(4).fill(null);

  return (
    <>
      {!isEdit ? (
        <div className="mamage_media_body_content p-0">
          <div className="mamane_media_content_innar">
            <div className="mamage_media_content_header">
              <h3>My Media </h3>
              <button>Upload</button>
            </div>
            <div className="mamage_my_media_content_sect">
              {arr.length ? (
                <div className="mamage_my_media_content">
                  <div className="mamage_my_media_dropdown_card_sect">
                    <div className="manage_media_main_check_box manage_media_check_box">
                      <label className="container">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className="mamage_my_media_dropdown_sect">
                      <div className="mamage_my_media_dropdown_box media_type_drop_box">
                        <p className="mb-0">Media Type</p>
                        <ul className="mamage_my_media_droplist media_type_drop_list">
                          <li>-</li>
                          <li>-</li>
                          <li>-</li>
                        </ul>
                      </div>

                      <div className="mamage_my_media_dropdown_box category_drop_box">
                        <p className="mb-0">Category</p>
                        <ul className="mamage_my_media_droplist category_drop_list">
                          <li>-</li>
                          <li>-</li>
                          <li>-</li>
                        </ul>
                      </div>

                      <div className="mamage_my_media_dropdown_box privacy_type_drop_box">
                        <p className="mb-0">Privacy Type</p>
                        <ul className="mamage_my_media_droplist privacy_type_drop_list">
                          <li>-</li>
                          <li>-</li>
                          <li>-</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mamage_my_media_all_delete">
                      <button>
                        <img
                          src="/images/trash_icon.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mamage_my_media_content_table_sect">
                    <div className="mamage_my_media_content_table_header">
                      <ul>
                        <li className="table_checkbox">
                          <div className="manage_media_main_check_box manage_media_check_box">
                            <label className="container">
                              <input type="checkbox" />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </li>
                        <li className="media">{rows.MEDIA}</li>
                        <li className="title">{rows.TITLE}</li>
                        <li className="file_name">{rows.FILE_NAME}</li>
                        <li className="category">{rows.CATEGORY}</li>
                        <li className="privacy_type">{rows.PRIVACY_TYPE}</li>
                        <li className="media_table_menu justify-content-around">
                          &nbsp;
                        </li>
                      </ul>
                    </div>
                    <div className="mamage_my_media_content_table_body">
                      {arr.map((item, i) => (
                        <ul key={i}>
                          <Item {...{ item, setIsEdit }} />
                        </ul>
                      ))}
                    </div>
                  </div>

                  <div className="manage_media_pagination">
                    <div className="pagination">
                      <a href="#" className="btn_disable">
                        «
                      </a>
                      <a href="#" className="btn_disable">
                        ‹
                      </a>
                      <a href="#" className="active">
                        1
                      </a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <a href="#">...</a>
                      <a href="#">5</a>
                      <a href="#" className="btn_active">
                        ›
                      </a>
                      <a href="#" className="btn_active">
                        »
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyMedia />
              )}
            </div>
          </div>
        </div>
      ) : (
        <UpdateItem />
      )}
    </>
  );
};

export default MyMedia;
