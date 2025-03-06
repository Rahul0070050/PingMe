"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Bell,
  Ellipsis,
  MessageSquareText,
  Phone,
  Search,
  SquareUser,
} from "lucide-react";
import ChatList from "./ChatList";
import profile from "../public/profile.jpeg";

const SideBar = () => {
  const [selectedTab, setSelectedTab] = useState("messages");
  return (
    <div className="flex flex-col border-r">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full"
            width={45}
            height={45}
            src={profile}
            alt="profile"
          />
          <div className="ml-0 leading-5">
            <h5 className="font-medium">Rahul O R</h5>
            {/* <span className="text-slate-500 text-sm">last seen at 14:11 PM</span> */}
          </div>
        </div>
        <div className="flex gap-3 text-gray-400">
          <Search className="w-9 h-9 p-2" />
          <Bell className="w-9 h-9 p-2" />
          <Ellipsis className="w-9 h-9 p-2" />
        </div>
      </div>
      <div className="flex justify-between px-4 py-3 border-b">
        <span
          className={cn(
            "flex flex-col gap-1 items-center text-sm text-slate-500 cursor-pointer hover:text-blue-400 transition-all",
            selectedTab === "messages" ? "text-blue-600" : ""
          )}
          onClick={() => setSelectedTab("messages")}
        >
          <MessageSquareText className="w-5 h-5" />
          MESSAGES
        </span>
        <span
          className={cn(
            "flex flex-col gap-1 items-center text-sm text-slate-500 cursor-pointer hover:text-blue-400 transition-all",
            selectedTab === "calls" ? "text-blue-600" : ""
          )}
          onClick={() => setSelectedTab("calls")}
        >
          <Phone className="w-5 h-5" />
          CALLS
        </span>
        <span
          className={cn(
            "flex flex-col gap-1 items-center text-sm text-slate-500 cursor-pointer hover:text-blue-400 transition-all",
            selectedTab === "contacts" ? "text-blue-600" : ""
          )}
          onClick={() => setSelectedTab("contacts")}
        >
          <SquareUser className="w-5 h-5" />
          CONTACTS
        </span>
      </div>
      <ChatList />
    </div>
  );
};

export default SideBar;
