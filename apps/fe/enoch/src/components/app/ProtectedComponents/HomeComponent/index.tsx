import React, { FC } from "react";
import PostService from "../../../../services/PostService";
import MainSectionWrapper from "../../../core/components/MainSectionWrapper";
import Header from "../HeaderComponent";
import Widgets from "./HomepageWidgets";
import Banners from "./HomepageWidgets/Banners";
import Post from "./PostComponent/Post";
import WritePostUI from "./WritePost/WritePostUI";

const HomePage: FC = () => {
  const [posts, setPosts] = React.useState<any>([]);
  React.useEffect(() => {
    (async function () {
      const posts = await PostService.getTimeline();
      setPosts(posts?.posts);
    })();
  }, []);

  return (
    <div className="dashboard-body-bg second-body-bg">
      <Header />
      <MainSectionWrapper>
        <div className="col-md-3">
          <Banners />
        </div>
        <div className="col-md-6">
          <div className="px-3">
            <WritePostUI />
            {!!posts && posts.map((post: any) => <Post {...{ post }} />)}
          </div>
        </div>
        <div className="col-md-3">
          <Widgets />
        </div>
      </MainSectionWrapper>
    </div>
  );
};

export default HomePage;
