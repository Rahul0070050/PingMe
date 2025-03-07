"use client";

import React from "react";
import Image from "next/image";
import { EllipsisVertical, Phone, Video } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleUserInfo } from "@/store/userSlice";

const ChatHeader: React.FC = () => {
  const { avatar, username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleToggleUserInfo = () => {
    dispatch(toggleUserInfo());
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shadow-sm">
      <div
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
        onClick={handleToggleUserInfo}
        role="button"
        aria-label={`View profile of ${username || "user"}`}
      >
        {avatar ? (
          <Image
            className="rounded-full border border-gray-200 shadow-sm"
            width={45}
            height={45}
            src={avatar}
            alt={`${username || "User"}'s profile picture`}
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full text-indigo-600 font-semibold text-xl shadow-sm">
            {username ? username[0].toUpperCase() : "?"}
          </div>
        )}
        <div className="leading-tight">
          <h5 className="font-semibold text-gray-900 text-lg">
            {username || "Alice"}
          </h5>
          <span className="text-sm text-gray-500">Last seen at 14:11 PM</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Start a voice call"
        >
          <Phone className="w-5 h-5" />
        </button>
        <button
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Start a video call"
        >
          <Video className="w-5 h-5" />
        </button>
        <button
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="More options"
        >
          <EllipsisVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
