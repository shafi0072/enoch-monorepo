import React, { useState } from "react";
import PostService from "../../../../services/PostService";
import Post from "../../ProtectedComponents/HomeComponent/PostComponent/Post";

const Posts = () => {
  const [posts, setPosts] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    (async function () {
      const posts = await PostService.getTimeline();
      setPosts(posts.posts);
    })();
  }, []);

  return (
    <>
      {posts.map((post: any) => (
        <Post {...{ post }} />
      ))}
    </>
  );
};

export default Posts;
