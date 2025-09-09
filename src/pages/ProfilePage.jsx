import React, { useEffect, useState } from "react";
import { GetUserData, SetUserPhoto } from "../services/GetAPIUSERinfo";

import LoodingPage from "../Components/LoodingPage";
import Photo from "../assets/img1.png";
import { Button, Input } from "@heroui/react";

export default function ProfilePage() {
  const [IsData, setIsData] = useState("");

  const [ShowData, setShowData] = useState(true);

  const [FileData, setFileData] = useState(null);

  const [GetData, setGetData] = useState("");

  function ColectFileData(e) {
    const FileFormData = new FormData();
    FileFormData.append("photo", e.target.files[0]);
    setFileData(FileFormData);
  }

  async function putphotoapi() {
    const res = await SetUserPhoto(FileData);
    console.log(res);

    await CallAPIUserInfo();
  }

  async function CallAPIUserInfo() {
    const res = await GetUserData();
    console.log(res);
    setGetData(res.user);
    setShowData(false);
  }

  useEffect(() => {
    CallAPIUserInfo();
  }, []);

  return (
    <>
      {ShowData ? (
        <LoodingPage />
      ) : (
        <div className="flex flex-row justify-center bg-gray-200">
          <div className=" my-20 text-center bg-gray-300 p-1 rounded-2xl ">
            <div className=" m-10  overflow-hidden flex flex-col align-middle ">
              <img
                className="w-40 h-40 object-cover rounded-full "
                onError={Photo}
                src={GetData.photo}
                alt=""
              />
              <label className="bg-gray-700 opacity-50 cursor-pointer hover:opacity-85 transition-all mt-3 pb-4 flex flex-row justify-center">
                <div className="pt-3">
                  <svg
                    className="w-8 h-8 block text-gray-300 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>

                <input
                  className="hidden "
                  onChange={ColectFileData}
                  type="file"
                />
              </label>
            </div>
            <Button color="success" onPress={putphotoapi}>
              {" "}
              Change Photo{" "}
            </Button>
            <div className="my-7">
              <p>{GetData.name}</p>
              <h1>{GetData.email}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
