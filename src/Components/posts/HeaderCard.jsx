import React from "react";
import userimg from "../../assets/12225935.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function HeaderCard({ userinfo, date }) {
  return (
    <div className="  p-3 my-3">
      <div className=" ">
        <div className="flex">
          <img
            onError={(e) => (e.target.src = userimg)}
            className=" rounded-full w-10 h-10 mr-3"
            src={userinfo.photo}
            alt={userinfo.name}
          />

          <div>
            <h3 className="text-md font-semibold ">{userinfo.name}</h3>
            <p className="text-xs text-gray-500">
              {dayjs(date).fromNow("DD/MM/YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
