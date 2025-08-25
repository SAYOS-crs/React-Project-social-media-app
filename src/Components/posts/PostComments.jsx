import React, { useContext, useState } from "react";
import HeaderCard from "./HeaderCard";
import ModelMenu from "../ModelMenu";
import { Button, Input, useDisclosure } from "@heroui/react";
import { TokenContext } from "../../context/AuthContextComponent";
import DropDownMenu from "../DropDownMenu";
import { DeleteAPIComment } from "../../services/DeleteAPI";
import UpdateCommentAPI from "../../services/UpdateCommentAPI";

export default function PostComments({
  CallSingelAPI,
  GetAllPostsAPI,
  CommentDetals,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userData } = useContext(TokenContext);
  const [IsLooding, setIsLooding] = useState(false);
  const [SwitchEditeMode, setSwitchEditeMode] = useState(false);
  const [EditeCountrol, setEditeCountrol] = useState(CommentDetals.content);
  const [UPdateing, setUPdateing] = useState(false);
  async function DeleteingComment(onClose) {
    setIsLooding(true);
    const res = await DeleteAPIComment(CommentDetals._id);
    console.log(res);
    if (res.message == "success") {
      await GetAllPostsAPI();
      onClose();
    }
    setIsLooding(false);
  }

  function CancelEdite() {
    setEditeCountrol(CommentDetals.content);
    setSwitchEditeMode(false);
  }

  console.log();

  async function PutUpdatedComment() {
    setUPdateing(true);
    const CommentID = CommentDetals._id;
    const res = await UpdateCommentAPI(CommentID, EditeCountrol);

    if (res.message === "success") {
      if (location.pathname.split("/")[1] === "post-detals") {
        await CallSingelAPI(location.pathname.split("/")[2]);
        setSwitchEditeMode(false);
      } else {
        await GetAllPostsAPI();
        setSwitchEditeMode(false);
      }
    }
    setUPdateing(false);
  }

  return (
    <>
      <div className="bg-gray-200 rounded-xl my-10 ">
        <div className="w-full h-16   items-center flex justify-between">
          <HeaderCard
            userinfo={CommentDetals.commentCreator}
            date={CommentDetals.createdAt}
          />

          {CommentDetals.commentCreator._id == userData.user._id && (
            <DropDownMenu
              onOpen={onOpen}
              setSwitchEditeMode={setSwitchEditeMode}
            />
          )}

          <ModelMenu
            IsLooding={IsLooding}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            DeleteingFunction={DeleteingComment}
            target={"Comment"}
          />
        </div>

        <div className="bg-gray-300 overflow-hidden rounded-b-2xl">
          {SwitchEditeMode ? (
            <>
              <Input
                disabled={UPdateing}
                validate={"bordered"}
                autoFocus
                value={EditeCountrol}
                onChange={(e) => setEditeCountrol(e.target.value)}
                className="block p-2 ps-13 bg-gray-300 w-full  "
                type="text"
              />
              <div className="flex justify-end gap-2 p-2">
                <Button onPress={CancelEdite} color="secondary">
                  Cancel
                </Button>
                <Button
                  isLoading={UPdateing}
                  onPress={PutUpdatedComment}
                  color="primary"
                >
                  Edite
                </Button>
              </div>
            </>
          ) : (
            <p className="p-3 mx-13 ">{CommentDetals.content}</p>
          )}
        </div>
      </div>
    </>
  );
}
