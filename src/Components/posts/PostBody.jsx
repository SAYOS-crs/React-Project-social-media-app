import React from "react";

export default function PostBody({ post }) {
  return (
    <>
      {post.body && <p className="max-w-fit overflow-hidden ">{post.body}</p>}
      {post.image && (
        <img
          src={post.image}
          className="w-full h-100  object-cover mt-5"
          alt="post"
        />
      )}
    </>
  );
}
