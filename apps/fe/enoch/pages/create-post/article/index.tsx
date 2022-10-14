import React from "react";
import Header from "../../../src/components/app/ProtectedComponents/HeaderComponent";
import PostWrapper from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";
import WriteArticle from "../../../src/components/app/ProtectedComponents/HomeComponent/WriteArticle";
const CreateArticlePage = () => {
  return (
    <LoggedInUser>
      <div className="container-fluid ">
        <Header />
        <WriteArticle />
      </div>
    </LoggedInUser>
  );
};

export default CreateArticlePage;
