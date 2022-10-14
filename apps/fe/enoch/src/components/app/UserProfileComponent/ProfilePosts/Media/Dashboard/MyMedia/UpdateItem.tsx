import React from "react";

const UpdateItem = () => {
  return (
    <div className="mamage_media_body_content avex_manage_media_nft">
      <form action="">
        <div className="main_sec_med">
          <div className="media_heading">
            <h2>Edit Media</h2>
          </div>
          <div className="submit_media">
            <button id="show_alert2" type="button" className="disable">
              Submit
            </button>
          </div>
        </div>

        <div className="inner_avex_bdy_sec">
          <div className="heading_basic">
            <h3>File_name.mp4</h3>
          </div>
          <div className="avex_inner_input_sec">
            <div className="column_avex_uploading">
              <div className="card_nft_uploading">
                <ul>
                  <li>
                    <div className="title_input_nft">
                      <h4>Title</h4>
                    </div>
                    <div className="nft_input_avex">
                      <input
                        type="text"
                        name=""
                        className="media_upload_title"
                        placeholder="My performance in London"
                        id="media_upload_title"
                      />
                    </div>
                  </li>
                  <li>
                    <div className="title_input_nft">
                      <h4>Category</h4>
                    </div>
                    {/* <!--surround the select box with a "country_select_code" DIV element. Remember to set the width:--> */}
                    <div className="carbon_country_code">
                      <button
                        id="dLabel2"
                        className="dropdown-select upload_media_catagory_dropdown"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Entertaintment
                        <img src="images/fill_dwn_arrow.png" alt="" />
                        <span className="caret"></span>
                      </button>
                      <ul
                        className="dropdown-menu_carbon "
                        aria-labelledby="dLabel"
                      >
                        <li>NFT Program</li>
                        <li>Preminum PKG</li>
                        <li>Telegram</li>
                      </ul>
                    </div>
                    {/* <!-- Country Code End --> */}
                  </li>
                  <li>
                    <div className="title_input_nft">
                      <h4>Upload thumbnail</h4>
                    </div>
                    <div className="nft_input_avex3">
                      <div id="img_display1" className="upload__btn">
                        <span className="placeholder d-none">Upload Image</span>

                        <input
                          type="file"
                          multiple
                          data-max_length="20"
                          className="upload__inputfile"
                          placeholder="Upload Image"
                        />
                        <span>
                          <img src="images/color_full_upload.png" alt="" />
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div id="img_show_bg" className="upload_img_box2">
                      <div className="main_upload_img_sec">
                        <img src="/images/media_img_1.png" alt="img-fluid" />
                        <span id="clse_upload" className="close_img_upload">
                          <img
                            className="close_icon_media"
                            src="/images/cus_cross.png
                        "
                            alt=""
                          />
                        </span>
                        <div className="upload_img_title">
                          <p>
                            Your picture must be between 800px /800px in size or
                            we will use the video thumbnail
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="title_input_nft">
                      <h4>Tags</h4>
                    </div>
                    <div className="nft_input_avex">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Placeholder"
                      />
                    </div>
                  </li>
                  <li>
                    <div className="tags_list_nft">
                      <h4>Suggested Tags</h4>
                      <div className="tags_lst_nme">
                        <span>#funny</span>
                        <span>#awesome</span>
                        <span>#Joker</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column_avex_uploading">
              <div className="card_nft_uploading2">
                <div className="preminum_feture_sec">
                  <div className="heading_preminum_box">
                    <h3>Premium feature</h3>
                  </div>

                  <div className="avex_upload-type-radio-sect2">
                    <label className="container_avex_nft_upld2">
                      <strong>
                        Pay per view
                        <span>Anyone can search and view</span>
                      </strong>
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <div className="set_price_preminum">
                    <div className="set_heading">
                      <h3>Set price for your video</h3>
                      <div className="set_price_input2">
                        <input type="text" name="" id="" placeholder="$0.00" />
                      </div>
                      <div className="descrp_upload_avex">
                        <p>
                          you can not set more than $5.00 price. As It is a
                          premium service we will take.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="alert_div2" className="lyer_alert">
                    <div className="alert-icon">
                      <img src="images/alert_info.png" alt="alrt" />
                      <div className="text_alrt">
                        <p>
                          Your profile still not eligible to use the Premium
                          feature.
                        </p>
                        <p>
                          <a className="more_details_btn" href="#">
                            Click here
                          </a>
                          to know more
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="privacy_setting">
                  <h4>Privacy Setting</h4>
                  <span>
                    <img src="images/info_setting.png" alt="" />
                  </span>
                </div>
                <div className="avex_upload-type-radio-sect">
                  <label className="container_avex_nft_upld">
                    <strong>
                      Public <span>Anyone can search and view</span>
                    </strong>
                    <input type="radio" name="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="avex_upload-type-radio-sect">
                  <label className="container_avex_nft_upld radio_private">
                    <strong>
                      Private <span>Only people you choose can view</span>
                    </strong>
                    <input type="radio" name="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="followers_btns_avex">
                  <button className="green_highlight disable">
                    230 Followers
                  </button>
                  <button className="purple_highlight disable">
                    12 Followers
                  </button>
                </div>

                {/* <!----------------On key Press Function Section--------------------> */}

                <div className="media_avex_SearchFull">
                  <input
                    type="text"
                    id="myHouse"
                    name="myHouse"
                    className="media_avex_SearchFull__search disable"
                    placeholder="Search the user to share"
                  />
                  <img
                    src="images/search-field-icon.svg"
                    className="media_avex_SearchFull__icon"
                    alt=""
                  />
                  <div
                    className="media_avex_SearchFull__Boxlist magicSearch-display-none media_avex_SearchFull_ul-box"
                    id="media_avex_Serch"
                  >
                    <ul className="media_avex_SearchFull__list ">
                      <li className="media_avex_SearchFull__list__item">
                        <img
                          src="images/user-1.png"
                          alt="User"
                          className="media_avex_SearchFull__list__img"
                        />
                        <div className="media_avex_SearchFull__list__detail">
                          <h4 className="magicSearch__list__name">
                            @rubikhell
                          </h4>
                        </div>
                      </li>
                      <li className="media_avex_SearchFull__list__item">
                        <img
                          src="images/user-1.png"
                          alt="User"
                          className="media_avex_SearchFull__list__img"
                        />
                        <div className="media_avex_SearchFull__list__detail">
                          <h4 className="magicSearch__list__name">
                            @rohandude
                          </h4>
                          <span>
                            <img
                              src="images/upload_dropdown_check.svg"
                              alt="icon"
                              className="img-fluid"
                            />
                          </span>
                        </div>
                      </li>
                      <li className="media_avex_SearchFull__list__item">
                        <img
                          src="images/user-1.png"
                          alt="User"
                          className="media_avex_SearchFull__list__img"
                        />
                        <div className="media_avex_SearchFull__list__detail">
                          <h4 className="media_avex_SearchFull__list__name">
                            @rxu
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <!----------------End --------------------> */}
              </div>
            </div>
          </div>
          <div className="trms_condition_sec">
            <div className="terms_cndition_deading">
              <h3>Terms &amp; Condition</h3>
            </div>
            <div className="terms_cndition_decrp">
              <div className="manage_media_main_check_box manage_media_check_box">
                <label className="container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
