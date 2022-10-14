import React from "react";
import Header from "../../../src/components/app/ProtectedComponents/HeaderComponent";
import PostWrapper from "../../../src/components/app/ProtectedComponents/HomeComponent/WritePost";
import LoggedInUser from "../../../src/components/core/components/LoggedInUser";

const CreateEventPage = () => {
  return (
    <LoggedInUser>
    <div className="container-fluid dashboard-body-bg second-body-bg">
      <Header />
      <div className="container my-2">
        <div className="row">
          <div className="col-md-12">
            <PostWrapper />
          </div>
        </div>
      </div>
    </div>
    </LoggedInUser>
  )
};

export default CreateEventPage;