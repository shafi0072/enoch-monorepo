import React, { useContext } from "react";
import PostWrapperFooter from "./PostWrapperFooter";
import SelectedCommunityInfo from "../../../ProtectedComponents/HomeComponent/WritePost/SelectedCommunityInfo";
import { PostContext } from "../../../../../../pages/create-post/PostContext";

const PostWrapper = ({ children, handleSubmit, postReady, isLoading }: any) => {
  const { footerVisible } = useContext(PostContext);

  return (
    <div className="second-body-bg">
      <div className="posting-steps-block">
        <div className="posting-steps-block-left">
          <div className="posting-steps-createPost">
            {children}
            {footerVisible && <PostWrapperFooter {...{ handleSubmit, postReady, isLoading }} />}
          </div>
        </div>

        <div className="posting-steps-block-right">
          <SelectedCommunityInfo />
          {/* {
            community ? <SelectedCommunityInfo /> : <SideBarPost />
          } */}
        </div>
      </div>
    </div>
  );
};

export default PostWrapper;
