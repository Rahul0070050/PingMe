"use client";

import ChatWindow from "@/components/ChatWindow";
import SideBar from "@/components/SideBar";
import UserProfile from "@/components/UserProfile";
import UserSettings from "@/components/UserSettings";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hook"; // Added useAppDispatch
import { toggleUserInfo } from "@/store/userSlice"; // Assuming this action exists
import { X } from "lucide-react";
import React from "react";

const ChatPage: React.FC = () => {
  const { openUserInfo, openUserSettings } = useAppSelector(
    (state) => state.user
  );

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4 max-md:p-0">
      <div
        className="w-full max-w-7xl h-[calc(100vh-2rem)] grid grid-cols-12 bg-white border shadow-md rounded-lg 
          md:gap-0 gap-4 overflow-hidden max-md:h-screen"
      >
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 border-r h-full md:h-[calc(100vh-2rem)]">
          <SideBar />
        </div>

        {/* Chat Window */}
        <div
          className={cn(
            "col-span-12 md:col-span-9 h-full md:h-[calc(100vh-2rem)] transition-all duration-300",
            (openUserInfo || openUserSettings) && "md:col-span-6"
          )}
        >
          <ChatWindow />
        </div>

        {openUserInfo && (
          <div
            className="col-span-12 md:col-span-3 h-full md:h-[calc(100vh-2rem)] transition-all duration-300 
              bg-white border-t md:border-t-0 md:border-l relative"
          >
            <UserProfile />
          </div>
        )}
        {openUserSettings && (
          <div
            className="col-span-12 md:col-span-3 h-full md:h-[calc(100vh-2rem)] transition-all duration-300 
              bg-white border-t md:border-t-0 md:border-l relative cursor-pointer"
          >
            <UserSettings contactId={1} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
