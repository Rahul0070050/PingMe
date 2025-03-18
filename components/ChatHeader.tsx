"use client";

import React from "react";
import Image from "next/image";
import { CircleArrowLeft, EllipsisVertical, Phone, Video } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openSideBar, closeSideBar, toggleUserInfo } from "@/store/userSlice";

const ChatHeader: React.FC = () => {
  const { avatar, username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleToggleUserInfo = () => {
    dispatch(toggleUserInfo());
  };

  return (
    <div className="flex items-center justify-between px-2 sm:px-4 py-2 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shadow-sm w-full">
      {/* User Info Section */}
      <div className="flex items-center">
        <div className="px-1 md:hidden" onClick={() => dispatch(openSideBar())}>
          <CircleArrowLeft />
        </div>
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-100 p-1 sm:p-2 rounded-lg transition-all duration-200"
          onClick={handleToggleUserInfo}
          role="button"
          aria-label={`View profile of ${username || "user"}`}
        >
          {avatar ? (
            <Image
              className="rounded-full border border-gray-200 shadow-sm"
              width={36} // Reduced for mobile
              height={36}
              src={avatar}
              alt={`${username || "User"}'s profile picture`}
              priority
              sizes="(max-width: 640px) 36px, 45px" // Responsive image sizing
            />
          ) : (
            <div className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 bg-indigo-100 rounded-full text-indigo-600 font-semibold text-lg sm:text-xl shadow-sm">
              {username ? username[0].toUpperCase() : "?"}
            </div>
          )}
          <div className="leading-tight">
            <h5 className="font-semibold text-gray-900 text-base sm:text-lg truncate max-w-[120px] sm:max-w-[200px]">
              {username || "Alice"}
            </h5>
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              Last seen at 14:11 PM
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1 sm:gap-2">
        <button
          className="p-1 sm:p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Start a voice call"
        >
          <Phone className="w-5 h-5 max-md:w-5 max-md:h-5" />
        </button>
        <button
          className="p-1 sm:p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Start a video call"
        >
          <Video className="w-5 h-5 max-md:w-5 max-md:h-5" />
        </button>
        <button
          className="p-1 sm:p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="More options"
        >
          <EllipsisVertical className="w-5 h-5 max-md:w-5 max-md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
