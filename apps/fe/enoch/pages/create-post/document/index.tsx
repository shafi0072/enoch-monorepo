import React, { useCallback, useState } from "react";
import Header from "../../../src/components/app/ProtectedComponents/HeaderComponent";
import PostWrapper from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost";
import DocumentPost from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost/DocumentPost";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";
import PostContextProvider from "../PostContext";
import IntialCreatePost from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost/IntialCreatePost";
import PostService from "../../../src/services/PostService";
import { postVisibility, whoCanSee } from '../../../src/constants/audience'
import { Users } from "../../../src/constants/Users";


const CreateDocumentPostPage = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [preview, setPreview] = React.useState<boolean>(false);
  const [textData, setTextData] = React.useState<string>("")
  const [title, setTitle] = React.useState<string>("")
  const [audience, setAudience] = useState<string>(whoCanSee.ANYONE);
  const [audienceValue, setAudienceValue] = useState<string>(postVisibility.PUBLIC);
  const [postingAs, setPostingAs] = useState<string>(Users.USER_ONE);
  const [postReady, setPostReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = useCallback(async () => {
    setIsLoading(true)
    const post = {
      file: selectedFile,
      title: title,
      textData: textData,
      audienceValue: audienceValue,
    }
    await PostService.documentPost({ post })
    setIsLoading(false)
  }, [selectedFile])


  return (
    <LoggedInUser>
      <div className="dashboard-body-bg second-body-bg">
        <Header />
        <div className="container my-2">
          <div className="row">
            <div className="col-md-12">

              <PostContextProvider>
                {!preview ? (
                  <PostWrapper >
                    <DocumentPost
                      {...{ selectedFile, setSelectedFile, setPreview, setTitle, setPostReady }}
                    />
                  </PostWrapper>
                ) : (
                  <PostWrapper {...{ handleSubmit, postReady, isLoading }}>
                    <IntialCreatePost {...{ setTextData, data: selectedFile, textData, audience, setAudience, postingAs, setPostingAs, audienceValue, setAudienceValue }} />
                  </PostWrapper>
                )}
              </PostContextProvider>
            </div>
          </div>
        </div>
      </div>
    </LoggedInUser>
  );
};

export default CreateDocumentPostPage;
