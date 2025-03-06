import Image from "next/image";
import React from "react";
import profile from "../public/profile.jpeg";

const ChatList = () => {
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer">
        <Image
          className="rounded-full"
          width={45}
          height={45}
          src={profile}
          alt="profile"
        />
        <div className="">
          <h5 className="font-medium">Rahul O R</h5>
          <span className="text-slate-500">Hi, how are you?</span>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer">
        <Image
          className="rounded-full"
          width={45}
          height={45}
          src={profile}
          alt="profile"
        />
        <div className="">
          <h5 className="font-medium">Rahul O R</h5>
          <span className="text-slate-500">Hi, how are you?</span>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer">
        <Image
          className="rounded-full"
          width={45}
          height={45}
          src={profile}
          alt="profile"
        />
        <div className="">
          <h5 className="font-medium">Rahul O R</h5>
          <span className="text-slate-500">Hi, how are you?</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
