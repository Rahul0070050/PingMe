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

const SideBar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    "messages" | "calls" | "contacts"
  >("messages");

  const tabs = [
    { id: "messages", icon: MessageSquareText, label: "Messages" },
    { id: "calls", icon: Phone, label: "Calls" },
    { id: "contacts", icon: SquareUser, label: "Contacts" },
  ];

  return (
    <div className="flex flex-col h-full bg-white shadow-md">
      <div className="flex items-center justify-between p-4 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full border border-gray-200 shadow-sm"
            width={45}
            height={45}
            src={profile}
            alt="Profile picture"
            priority
          />
          <div className="leading-tight">
            <h5 className="font-semibold text-gray-900">Rahul O R</h5>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="More options"
          >
            <Ellipsis className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex justify-around py-3 border-b border-gray-200 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg",
              "hover:text-indigo-600 hover:bg-indigo-100 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500",
              selectedTab === tab.id && "text-indigo-600 bg-indigo-50"
            )}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            aria-label={`Switch to ${tab.label}`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label.toUpperCase()}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatList />
      </div>
    </div>
  );
};

export default SideBar;
