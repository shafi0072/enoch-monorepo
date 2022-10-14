import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useApiForm } from "../../../src/hooks/useApiForm";
import Header from "../../../src/components/app/ProtectedComponents/HeaderComponent";
import PostWrapper from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost";
import VideoPost from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost/VideoPost";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";
import PostService from "../../../src/services/PostService";
import PostContextProvider from "../PostContext";

const videoPostSchema = yup.object().shape({
  audience: yup.string().required(),
});

const CreateVideoPostPage = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid },
  } = useApiForm({
    onSubmit,
    resolver: yupResolver(videoPostSchema),
    mode: "onChange",
  });

  async function onSubmit(data: any) {
    setIsLoading(true);
    const post = {
      file: selectedFile,
      title: data.title,
      textData: data.caption,
      audienceValue: data.audience,
    };
    await PostService.videoPost(post);
    setIsLoading(false);
  }

  return (
    <LoggedInUser>
      <div className=" dashboard-body-bg second-body-bg">
        <Header />
        <div className="container my-2">
          <div className="row">
            <div className="col-md-12">
              <PostContextProvider>
                <PostWrapper>
                  <VideoPost
                    {...{
                      handleSubmit,
                      register,
                      control,
                      setSelectedFile,
                      isLoading,
                      isValid,
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

export default CreateVideoPostPage;
