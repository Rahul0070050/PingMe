"use client";
import React from "react";
import profile from "../public/profile.jpeg";
import { EllipsisVertical, Phone, Video } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";

const ChatHeader = () => {
  const { id, avatar, username } = useAppSelector((state) => state.user);
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
        <div className="leading-5">
          <h5 className="font-medium">{username}</h5>
          <span className="text-slate-500 text-sm">last seen at 14:11 PM</span>
        </div>
      </div>
      <div className="flex gap-3 text-gray-400">
        <Phone className="w-9 h-9 p-2" />
        <Video className="w-9 h-9 p-2" />
        <EllipsisVertical className="w-9 h-9 p-2" />
      </div>
    </div>
  );
};

export default ChatHeader;
