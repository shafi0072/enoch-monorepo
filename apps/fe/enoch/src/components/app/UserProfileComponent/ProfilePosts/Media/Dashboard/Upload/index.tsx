import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { pick } from "../../../../../../../utils/lodash";
import { FiSearch } from "react-icons/fi";
import SelectInputField from "../../../../../../core/components/SelectInputField";
import TagInput from "./TagInput";
import UserList from "./UserList";
import UploadProgress from "./UploadProgress";
import TermsAndCondition from "./TermsAndCondition";
import classnames from "classnames";
import PrivacySettings from "./PrivacySettings";
import { yupResolver } from "@hookform/resolvers/yup";
import { MediaUploadValidationSchema } from "./UploadMediaValidation";
import usePreviewThumbnail from "../../../../../../../hooks/usePreviewThumbnail";

enum HookFormRegisterTypes {
  TITLE = "title",
  CATEGORY = "category",
  MEDIA = "media",
  IMAGE_THUMBNAIL = "image_thumbnail",
  PAY_PER_VIEW_COST = "pay_per_view_cost",
  PRIVACY = "privacy",
  TERMS_AND_CONDITIONS = "terms_and_conditions",
}

enum RadioButtons {
  PUBLIC = "public",
  PRIVATE = "private",
  PAY_PER_VIEW = "pay_per_view",
}

const selectStyles = {
  border: "1px solid #E8E9EB",
  backgroundColor: "transparent",
  fontSize: "14px",
  borderRadius: "0",
  fontFamily: "Poppins",
  height: "100%",
  marginRight: "16px",
};

const categories = [
  {
    label: "NFT Program",
    value: "NFT Program",
  },
  {
    label: "Premium PKG",
    value: "Premium PKG",
  },
  {
    label: "Telegram",
    value: "Telegram",
  },
];

const Upload = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(MediaUploadValidationSchema),
  });
  const [imageThumbnail, setImageThumbnail] = useState<string>("");
  const [mediaFileName, setMediaFileName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestedTag, setSuggestedTag] = useState<string[]>([
    "#funny",
    "#awesome",
    "#jokes",
  ]);
  const { handleFileEvent } = usePreviewThumbnail({
    setBuffer: setImageThumbnail,
  });
  const [tags, setTags] = useState<string[]>([]);
  const privacy = watch("privacy", false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const closePreviewThumbnail = useCallback(() => {
    setImageThumbnail("");
  }, []);

  const handleVideoFile = useCallback((e: any) => {
    const file = e.target.files[0];
    setMediaFileName(file.name);
  }, []);

  return (
    <div className="mamage_media_body_content avex_manage_media_nft">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="main_sec_med">
          <div className="media_heading">
            <h2>Upload Media</h2>
          </div>
          <div className="submit_media">
            <button
              type="submit"
              id="show_alert2"
              className={classnames({ disable: !isValid })}
            >
              Submit
            </button>
          </div>
        </div>
        {mediaFileName && <UploadProgress {...{ fileName: mediaFileName }} />}
        <div className="inner_avex_bdy_sec">
          <div className="heading_basic">
            <h3>Basic</h3>
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
                        className="media_upload_title"
                        placeholder="My performance in London"
                        id="media_upload_title"
                        {...register(HookFormRegisterTypes.TITLE)}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="title_input_nft">
                      <h4>Category</h4>
                    </div>

                    <div className="carbon_country_code">
                      <Controller
                        name={HookFormRegisterTypes.CATEGORY}
                        render={({
                          field: { onChange, value, ref, ...rest },
                        }) => (
                          <SelectInputField
                            controlStyle={selectStyles}
                            placeholder="category"
                            rest={rest}
                            value={value}
                            ref={ref}
                            options={categories}
                            onChange={onChange}
                          />
                        )}
                        control={control}
                        defaultValue={""}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="title_input_nft">
                      <h4>Upload video</h4>
                    </div>
                    <div className="nft_input_avex3">
                      <div id="img_display1" className="upload__btn">
                        <span className="placeholder-text">Upload media</span>

                        <input
                          type="file"
                          multiple
                          className="upload__inputfile"
                          placeholder="Upload Image"
                          onChange={(e: any) => handleVideoFile(e)}
                        />
                        <span>
                          <img src="images/color_full_upload.png" alt="" />
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="title_input_nft">
                      <h4>Upload thumbnail</h4>
                    </div>
                    <div className="nft_input_avex3">
                      <div id="img_display1" className="upload__btn">
                        <span className="placeholder-text">Upload Image</span>

                        <input
                          type="file"
                          multiple
                          className="upload__inputfile"
                          placeholder="Upload Image"
                          accept="image/*"
                          onChange={(e: any) => handleFileEvent(e)}
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
                        {imageThumbnail && (
                          <div className="preview-thumbnail">
                            <img
                              className="thumbnail"
                              src={imageThumbnail}
                              alt="img-fluid"
                            />

                            <span
                              onClick={closePreviewThumbnail}
                              id="clse_upload"
                              className="close_img_upload"
                            >
                              <img
                                className="close_icon_media"
                                src="/images/cus_cross.png
                            "
                                alt=""
                              />
                            </span>
                          </div>
                        )}

                        <div className="upload_img_title">
                          <p>
                            Your picture must be between 800px /800px in size or
                            we will use the video thumbnail
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <TagInput {...{ tags, setTags }} />
                  <li>
                    <div className="tags_list_nft">
                      <h4>Suggested Tags</h4>
                      <div className="tags_lst_nme">
                        {suggestedTag.map((tag: string) => (
                          <span
                            onClick={() => setTags((prev) => [...prev, tag])}
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column_avex_uploading">
              <div className="card_nft_uploading2">
                <PrivacySettings
                  {...{
                    RadioButtons,
                    register,
                    privacy,
                    HookFormRegisterTypes,
                  }}
                />

                <div className="media_avex_SearchFull">
                  <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    className={classnames("media_avex_SearchFull__search", {
                      disable: privacy !== RadioButtons.PRIVATE,
                    })}
                    placeholder="Search the user to share"
                  />
                  <FiSearch
                    className={classnames("icon", {
                      disable: privacy !== RadioButtons.PRIVATE,
                    })}
                  />
                  <img
                    src="images/search-field-icon.svg"
                    className="media_avex_SearchFull__icon"
                    alt=""
                  />
                  {privacy === RadioButtons.PRIVATE && (
                    <div
                      className="media_avex_SearchFull__Boxlist magicSearch-display-none d-block media_avex_SearchFull_ul-box"
                      id="media_avex_Serch"
                    >
                      <UserList
                        {...{ searchTerm, setSelectedUsers, selectedUsers }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <TermsAndCondition {...{ register, HookFormRegisterTypes }} />
        </div>
      </form>
    </div>
  );
};

export default Upload;
