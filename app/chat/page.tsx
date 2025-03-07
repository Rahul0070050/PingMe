"use client";

import ChatWindow from "@/components/ChatWindow";
import SideBar from "@/components/SideBar";
import UserProfile from "@/components/UserProfile";
import UserSettings from "@/components/UserSettings";
import Settings from "@/components/Settings";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hook";
import React from "react";
import StartNewChat from "@/components/StartNewChat";

const ChatPage: React.FC = () => {
  const {
    openUserInfo,
    openUserSettings,
    openSettings,
    openStartNewChat,
    showSideBar,
  } = useAppSelector((state) => state.user);

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4 max-md:p-0">
      <div
        className="w-full max-w-7xl h-[calc(100vh-2rem)] grid grid-cols-12 bg-white border shadow-md rounded-lg 
          md:gap-0 gap-4 overflow-hidden max-md:h-screen"
      >
        <div
          className={cn(
            "col-span-12 xl:col-span-3 md:col-span-5 border-r h-full md:h-[calc(100vh-2rem)]",
            showSideBar ? "max-md:hidden" : ""
          )}
        >
          <SideBar />
        </div>
        <div
          className={cn(
            "col-span-12 xl:col-span-9 md:col-span-7 h-full md:h-[calc(100vh-2rem)] max-md:h-[calc(100vh)] transition-all duration-300",
            (openUserInfo || openUserSettings || openStartNewChat) &&
              "md:hidden xl:block xl:col-span-6 max-md:hidden",
            showSideBar ? "" : "max-md:hidden"
          )}
        >
          {openSettings ? <Settings /> : <ChatWindow />}
        </div>
        {openUserInfo && (
          <div className="col-span-12 md:col-span-7 xl:col-span-3 h-full md:h-[calc(100vh-2rem)] transition-all duration-300 bg-white border-t md:border-t-0 md:border-l relative">
            <UserProfile />
          </div>
        )}
        {openUserSettings && (
          <div className="col-span-12 md:col-span-7 xl:col-span-3 h-full md:h-[calc(100vh-2rem)] transition-all duration-300 bg-white border-t md:border-t-0 md:border-l relative">
            <UserSettings contactId={1} />
          </div>
        )}
        {openStartNewChat && (
          <div className="col-span-12 md:col-span-7 xl:col-span-3 h-full md:h-[calc(100vh-2rem)] transition-all duration-300 bg-white border-t md:border-t-0 md:border-l relative">
            <StartNewChat />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
