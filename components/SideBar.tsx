import React from "react";
import profile from "../public/profile.jpeg";
import Image from "next/image";
import {
  Bell,
  Ellipsis,
  MessageSquareText,
  Phone,
  Search,
  SquareUser,
} from "lucide-react";

const SideBar = () => {
  return (
    <div className="flex flex-col border-r">
      <div className="flex justify-between items-center p-4 border-b">
        <Image
          className="rounded-full"
          width={45}
          height={45}
          src={profile}
          alt="profile"
        />
        <div className="flex gap-3 text-gray-400">
          <Search className="w-9 h-9 p-2" />
          <Bell className="w-9 h-9 p-2" />
          <Ellipsis className="w-9 h-9 p-2" />
        </div>
      </div>
      <div className="flex justify-between px-4 py-3 border-b">
        <span className="flex flex-col items-center text-sm text-slate-500">
          <MessageSquareText className="w-5 h-5" />
          MESSAGES
        </span>
        <span className="flex flex-col items-center text-sm text-slate-500">
          <Phone className="w-5 h-5" />
          CALLS
        </span>
        <span className="flex flex-col items-center text-sm text-slate-500">
          <SquareUser className="w-5 h-5" />
          CONTACTS
        </span>
      </div>
    </div>
  );
};

export default SideBar;
