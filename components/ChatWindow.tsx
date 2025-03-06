import Image from "next/image";
import React from "react";
import profile from "../public/profile.jpeg";
import { EllipsisVertical, Phone, Video } from "lucide-react";

const ChatWindow = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-2 px-4 border-b">
        <div className="flex items-center gap-4 p-2 hover:bg-slate-100 cursor-pointer">
          <Image
            className="rounded-full"
            width={45}
            height={45}
            src={profile}
            alt="profile"
          />
          <div className="leading-5">
            <h5 className="font-medium">Rahul O R</h5>
            <span className="text-slate-500 text-sm">
              last seen at 14:11 PM
            </span>
          </div>
        </div>
        <div className="flex gap-3 text-gray-400">
          <Phone className="w-9 h-9 p-2" />
          <Video className="w-9 h-9 p-2" />
          <EllipsisVertical className="w-9 h-9 p-2" />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
