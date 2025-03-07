"use client";
import ChatWindow from "@/components/ChatWindow";
import SideBar from "@/components/SideBar";
import UserProfile from "@/components/UserProfile";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hook";
import { X } from "lucide-react";
import React from "react";

const page = () => {
  const { openUserInfo } = useAppSelector((state) => state.user);
  return (
    <div className="bg-slate-100 h-screen flex items-center justify-center">
      <div className="w-9/12 h-[calc(100vh-10vh)] grid grid-cols-12 bg-white border shadow rounded-md">
        <div className="col-span-3">
          <SideBar />
        </div>
        <div
          className={cn(
            "transition-all",
            openUserInfo ? "col-span-6" : "col-span-9"
          )}
        >
          <ChatWindow />
        </div>
        {/* <div className={cn("col-span-6")}>
          <ChatWindow />
        </div> */}
        {openUserInfo && (
          <div className="col-span-3 transition-all">
            <UserProfile />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
