import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetSingelPost from "../services/GetSingelPost";
import LoodingPage from "../Components/LoodingPage";
import AllPosts from "../Components/posts/post";

export default function PageDetals() {
  const [Islooding, setIslooding] = useState(null);
  const { id } = useParams();

  async function CallSingelAPI() {
    const data = await GetSingelPost(id);
    setIslooding(data.post);
  }

  useEffect(() => {
    CallSingelAPI();
  }, []);

  return (
    <>
      {" "}
      {Islooding ? (
        <AllPosts CallSingelAPI={CallSingelAPI} post={Islooding} />
      ) : (
        <LoodingPage />
      )}{" "}
    </>
  );
}
