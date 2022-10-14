import React, { useState, useCallback } from "react";
import Header from "../../src/components/app/ProtectedComponents/HeaderComponent";
import PostWrapper from "../../src/components/app/ProtectedComponents/HomeComponent/WritePost";
import IntialCreatePost from "../../src/components/app/ProtectedComponents/HomeComponent/WritePost/IntialCreatePost";
import LoggedInUser from "../../src/components/core/components/LoggedInUser";
import { postVisibility, whoCanSee } from "../../src/constants/audience";
import { Users } from "../../src/constants/Users";
import PostService from "../../src/services/PostService";
import PostContextProvider from "./PostContext";

const Createpost = () => {
  const [textData, setTextData] = useState<string>("");
  const [audience, setAudience] = useState<string>(whoCanSee.ANYONE);
  const [postingAs, setPostingAs] = useState<string>(Users.USER_ONE);
  const [audienceValue, setAudienceValue] = useState<string>(
    postVisibility.PUBLIC
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postReady, setPostReady] = useState<boolean>(true);

  const handleSubmit = async () => {
    setIsLoading(true);
    const post = {
      textData: textData,
      audienceValue: audienceValue,
    };
    await PostService.textPost(post);
    setIsLoading(false);
  };

  return (
    <LoggedInUser>
      <div className="dashboard-body-bg second-body-bg">
        <Header />
        <div className="container my-2">
          <div className="row">
            <div className="col-md-12">
              <PostContextProvider>
                <PostWrapper {...{ handleSubmit, isLoading, postReady }}>
                  <IntialCreatePost
                    {...{
                      setTextData,
                      textData,
                      postingAs,
                      setPostingAs,
                      audience,
                      setAudience,
                      audienceValue,
                      setAudienceValue,
                    }}
                  />
                </PostWrapper>
              </PostContextProvider>
            </div>
          </div>
        </div>
      </div>
    </LoggedInUser>
  );
};

export default Createpost;
