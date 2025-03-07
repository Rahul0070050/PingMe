"use client";
import React from "react";
import profile from "../public/profile.jpeg";
import { EllipsisVertical, Phone, Video } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleUserInfo } from "@/store/userSlice";

const ChatHeader = () => {
  const { avatar, username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between p-2 px-4 border-b">
      <div className="flex items-center gap-4 p-2 cursor-pointer">
        {avatar ? (
          <Image
            className="rounded-full"
            width={45}
            height={45}
            src={avatar}
            alt="profile"
          />
        ) : (
          <div className="flex items-center justify-center font-semibold text-3xl w-10 h-10 bg-blue-300 rounded-full text-black/70">
            {username && username[0].toUpperCase()}
          </div>
        )}
        <div className="leading-5" onClick={() => dispatch(toggleUserInfo())}>
          <h5 className="font-medium">Alice</h5>
          <span className="text-slate-500 text-sm">last seen at 14:11 PM</span>
        </div>
      </div>
      <div className="flex gap-3 text-gray-500 mr-5">
        <Phone className="w-8 h-8 p-1 cursor-pointer hover:text-slate-600 transition-all" />
        <Video className="w-8 h-8 p-1 cursor-pointer hover:text-slate-600 transition-all" />
        <EllipsisVertical className="w-8 h-8 p-1 cursor-pointer hover:text-slate-600 transition-all" />
      </div>
    </div>
  );
};

export default ChatHeader;
