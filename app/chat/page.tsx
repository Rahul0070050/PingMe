import ChatWindow from "@/components/ChatWindow";
import SideBar from "@/components/SideBar";
import React from "react";

const page = () => {
  return (
    <div className="bg-slate-100 h-screen flex items-center justify-center">
      <div className="w-9/12 h-[calc(100vh-10vh)] grid grid-cols-12 bg-white border shadow rounded-md">
        <div className="col-span-3">
          <SideBar />
        </div>
        <div className="col-span-9">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default page;
