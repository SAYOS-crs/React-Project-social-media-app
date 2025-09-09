import React, { useRef, useState } from "react";
import { Button, Input, Textarea } from "@heroui/react";
import CreatPostAPI from "../services/CreatPostAPI";

export default function CreatPost({ GetAllPostsAPI }) {
  const [TextContent, setTextContent] = useState("");
  const [ImgFile, setImgFile] = useState(null);
  const [imgURL, setimgURL] = useState(null);
  const [IsLooding, setIsLooding] = useState(false);
  const [PostCreation, setPostCreation] = useState(false);
  const [successMassage, setsuccessMassage] = useState(false);
  const [ErorrMassage, setErorrMassage] = useState(false);

  const ImgValue = useRef(null);

  function getImgFile(e) {
    setImgFile(e.target.files[0]);
    console.log();

    setimgURL(URL.createObjectURL(e.target.files[0]));
  }
  function CloseIMG() {
    setimgURL(null);
    setImgFile(null);
    ImgValue.current.value = null;
  }

  function ClearPostCreation() {
    CloseIMG();
    setTextContent("");
  }

  if (ErorrMassage) {
    setTimeout(() => {
      setErorrMassage(false);
    }, 5000);
  }

  async function CollectCreatedPostData() {
    if (TextContent.trim() == "" && ImgFile === null) {
      setErorrMassage(true);
      return;
    }
    // converting to form data
    const formData = new FormData();
    if (TextContent) {
      formData.append("body", TextContent);
    }
    if (ImgFile) {
      formData.append("image", ImgFile);
    }

    // calling api her
    setIsLooding(true);
    const res = await CreatPostAPI(formData);
    console.log(res);
    setIsLooding(false);
    if (res.message == "success") {
      setsuccessMassage(true);
      setTimeout(() => {
        ClearPostCreation();
        GetAllPostsAPI();
        setsuccessMassage(false);
        setPostCreation(false);
      }, 1000);
    }
  }

  return (
    <>
      <div className=" shadow-2xl p-4 my-5 xl:w-1/2 sm:w-3/4 mx-auto">
        {PostCreation ? (
          <form>
            <Textarea
              autoFocus
              value={TextContent}
              onChange={(e) => {
                setTextContent(e.target.value);
              }}
              className=" w-full border-b-1 pb-8 border-gray-300 block my-8"
              label="Comment"
              placeholder="Whats in your mind ..."
            />

            {imgURL && (
              <div className="relative">
                <div
                  onClick={CloseIMG}
                  className="absolute  right-0 m-3 cursor-pointer"
                >
                  <svg
                    className="w-[26px] h-[26px] text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <img
                  className="w-full object-cover  h-100 border-b-1 pb-8 border-gray-300"
                  src={imgURL}
                  alt=""
                />
              </div>
            )}

            <div className="flex flex-row justify-between">
              <div className=" flex flex-col   justify-center ">
                <label className="cursor-pointer ms-3">
                  <svg
                    className="w-[31px] h-[31px] text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.9"
                      d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                    />
                  </svg>

                  <input
                    ref={ImgValue}
                    onChange={(e) => getImgFile(e)}
                    className=" hidden"
                    type="file"
                  ></input>
                </label>
              </div>

              <div>
                <Button
                  onPress={() => {
                    setOpenPostCreation(false), ClearPostCreation();
                  }}
                  className="my-5 mx-5 ms-auto"
                  color="default"
                >
                  {" "}
                  Cancel{" "}
                </Button>
                <Button
                  disabled={IsLooding || successMassage}
                  isLoading={IsLooding}
                  onPress={CollectCreatedPostData}
                  className="my-5  ms-auto"
                  color="primary"
                >
                  {" "}
                  Post{" "}
                </Button>
              </div>
            </div>
            {successMassage && (
              <span className="text-green-500 text-center block">
                post created successfly
              </span>
            )}
            {ErorrMassage && (
              <span className="text-red-500 text-center block">
                Cant Supmit Emety Post
              </span>
            )}
          </form>
        ) : (
          <button
            onClick={() => setPostCreation(true)}
            className="bg-gray-200 w-full text-left p-4 rounded-2xl text-gray-400 hover:bg-gray-300 transition-all duration-400 "
          >
            Creat a Post ... ?
          </button>
        )}
      </div>
    </>
  );
}
