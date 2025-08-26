import React from "react";
import PostHeader from "./PostHeader";
import PostFootder from "./PostFootder";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import { Button } from "@heroui/react";
import { useState } from "react";
export default function AllPosts({
  CallSingelAPI,
  GetAllPostsAPI,
  post,
  commentLimits,
}) {
  const [CommentsOfDetalsPage, setCommentsOfDetalsPage] = useState(2);
  const [Islooding, setIslooding] = useState(false);

  function AddMoreComments() {
    setIslooding(true);

    setTimeout(() => {
      setIslooding(false);
      setCommentsOfDetalsPage(CommentsOfDetalsPage + 2);
    }, 200);
  }

  return (
    <>
      <div className=" md:w-3/4 lg:w-2/4  mx-auto rounded-md shadow-md h-auto py-3 px-3 my-5">
        <PostHeader
          userinfo={post.user}
          GetAllPostsAPI={GetAllPostsAPI}
          PostID={post._id}
          date={post.createdAt}
        />

        <PostBody post={post} />

        <PostFootder
          CallSingelAPI={CallSingelAPI}
          post={post}
          GetAllPostsAPI={GetAllPostsAPI}
          PostID={post._id}
        />

        {post.comments
          .slice(0, commentLimits ?? CommentsOfDetalsPage)
          .map((comment) => (
            <PostComments
              CallSingelAPI={CallSingelAPI}
              GetAllPostsAPI={GetAllPostsAPI}
              key={comment._id}
              CommentDetals={comment}
            />
          ))}

        <div className="text-center my-5">
          {!commentLimits && post.comments.length >= CommentsOfDetalsPage && (
            <Button isLoading={Islooding} onPress={AddMoreComments}>
              Loode More Comments
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
