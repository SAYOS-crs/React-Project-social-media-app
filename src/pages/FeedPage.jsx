import React, { useEffect, useState } from "react";
import { useContext } from "react";
import GetFeedAPI from "../services/GetFeedAPI.JS";
import AllPosts from "../Components/posts/post";
import LoodingPage from "../Components/LoodingPage";
import CreatPost from "../Components/CreatPost";

export default function FeedPage() {
  const [Islooding, setIslooding] = useState(true);
  const [Posts, setPosts] = useState(null);

  async function GetAllPostsAPI() {
    const res = await GetFeedAPI();
    console.log(res);
    setPosts(res.posts);
  }

  useEffect(() => {
    GetAllPostsAPI();
  }, []);

  return (
    <>
      <CreatPost GetAllPostsAPI={GetAllPostsAPI} />
      {Posts ? (
        Posts.map((post) => (
          <AllPosts
            key={post.id}
            post={post}
            GetAllPostsAPI={GetAllPostsAPI}
            commentLimits={1}
          />
        ))
      ) : (
        <LoodingPage />
      )}
    </>
  );
}
