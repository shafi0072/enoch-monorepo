import React, { useState } from "react";
import { useApiForm } from "../../../src/hooks/useApiForm";
import { base64StringToBlob } from "blob-util";
import Header from "../../../src/components/app/ProtectedComponents/HeaderComponent";
import PostWrapper from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";
import ImagePost from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost/ImagePost";
import PostContextProvider from "../PostContext";
import PostService from "../../../src/services/PostService";

interface dataProps {
  title: string;
  message: string;
  profile: string;
}

const CreatePhotoPostPage = () => {
  const [image, setImage] = useState<any>(null);
  const [imageThumbnail, setImageThumbnail] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { isValid },
  } = useApiForm({
    onSubmit,
    mode: "onChange",
  });

  async function onSubmit(data: dataProps) {
    const { title, message, profile } = data;
    setIsLoading(true);
    const post = {
      file: image,
      title: title,
      caption: message,
      postingAs: profile,
    };

    await PostService.photoPost(post);
    setIsLoading(false);
  }
  return (
    <LoggedInUser>
      <div className="dashboard-body-bg second-body-bg">
        <Header />
        <div className="container my-2">
          <div className="row">
            <div className="col-md-12">
              <PostContextProvider>
                <PostWrapper>
                  <ImagePost
                    {...{
                      handleSubmit,
                      register,
                      control,
                      image,
                      setImage,
                      imageThumbnail,
                      setImageThumbnail,
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

export default CreatePhotoPostPage;
