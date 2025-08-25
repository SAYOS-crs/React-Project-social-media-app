import React, { useContext, useState } from "react";

import { useDisclosure } from "@heroui/react";

import { TokenContext } from "../../context/AuthContextComponent";

import DropDownMenu from "../DropDownMenu";
import ModelMenu from "../ModelMenu";
import HeaderCard from "./HeaderCard";
import DeletePostAPI from "../../services/DeleteAPI";

export default function PostHeader({ userinfo, GetAllPostsAPI, PostID, date }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userData } = useContext(TokenContext);
  const [IsLooding, setIsLooding] = useState(false);

  async function DeleteingPost(onClose) {
    setIsLooding(true);
    const res = await DeletePostAPI(PostID);
    console.log(res);

    if (res.message === "success") {
      await GetAllPostsAPI();
      onClose();
    }
    setIsLooding(false);
  }

  return (
    <>
      <div className="w-full h-16   items-center flex justify-between">
        <HeaderCard userinfo={userinfo} date={date} />

        {userinfo._id == userData.user._id && <DropDownMenu onOpen={onOpen} />}

        <ModelMenu
          IsLooding={IsLooding}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          DeleteingFunction={DeleteingPost}
          target={"Post"}
        />
      </div>
    </>
  );
}
