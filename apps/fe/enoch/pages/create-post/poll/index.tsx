import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "../../../src/components/app/ProtectedComponents/HeaderComponent";
import PostWrapper from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost";
import CreatePoll from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost/CreatePoll";
import IntialCreatePost from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost/IntialCreatePost";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";
import { postVisibility, whoCanSee } from "../../../src/constants/audience";
import { Users } from "../../../src/constants/Users";
import PostContextProvider from "../PostContext";
import { arrayToObj, toAlphabetColumnName } from "../../../src/utils";
import { PostTypeEnums } from "../../../src/constants/post-enums";
import PostService from "../../../src/services/PostService";
import ToastService from "../../../src/services/ToastService";

const formSchema = Yup.object().shape({
  options: Yup.array().of(
    Yup.object().shape({
      option: Yup.string().required("Option is required"),
    })
  ),
});

const CreatePollPage = () => {
  const [preview, setPreview] = React.useState<boolean>(false);
  const [textData, setTextData] = React.useState<string>("");
  const [audienceValue, setAudienceValue] = React.useState<string>(
    postVisibility.PUBLIC
  );
  const [postingAs, setPostingAs] = React.useState<string>(Users.USER_ONE);
  const [postReady, setPostReady] = React.useState<boolean>(false);
  const [audience, setAudience] = React.useState<string>(whoCanSee.ANYONE);
  const [pollData, setpollData] = React.useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      duration: "",
      question: "",
      options: [{ option: "" }, { option: "" }],
    },

    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    setPreview(true);
    setpollData(data);
    setPostReady(true);
  };

  const formSubmit = useCallback(async () => {
    try {
      const { question, options, duration }: any = pollData;
      const optionData = options.map((val: any, index: number) => {
        const optionIndex = toAlphabetColumnName(index);
        return { option: val.option, optionIndex };
      });

      const [optionA, optionB, optionC, optionD] = arrayToObj(optionData);
      setIsLoading(true);
      const poll = {
        title: question,
        caption: textData,
        duration: duration,
        type: PostTypeEnums.Poll,
        whoCanSee: audienceValue,
        optionA: optionA?.option,
        optionB: optionB?.option,
        optionC: optionC?.option,
        optionD: optionD?.option,
      };
      await PostService.createPoll(poll);
      setIsLoading(false);
    } catch (e: any) {
      ToastService.error(e.message);
    }
  }, [pollData, textData]);

  return (
    <LoggedInUser>
      <div className="dashboard-body-bg second-body-bg">
        <Header />
        <div className="container my-2">
          <div className="row">
            <div className="col-md-12">
              <PostContextProvider>
                {!preview ? (
                  <PostWrapper handleSubmit={handleSubmit(onSubmit)}>
                    <CreatePoll
                      {...{
                        register,
                        handleSubmit,
                        control,
                        errors,
                      }}
                    />
                  </PostWrapper>
                ) : (
                  <PostWrapper
                    {...{ postReady, isLoading }}
                    handleSubmit={formSubmit}
                  >
                    <IntialCreatePost
                      {...{
                        data: pollData,
                        textData,
                        setTextData,
                        audience,
                        setAudience,
                        postingAs,
                        setPostingAs,
                        audienceValue,
                        setAudienceValue,
                      }}
                    />
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

export default CreatePollPage;
