"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Bell,
  Ellipsis,
  LogOut,
  MessageSquare,
  MessageSquareText,
  Phone,
  Search,
  SquareUser,
  User,
} from "lucide-react";
import ChatList from "./ChatList";
import profile from "../public/profile.jpeg";
import {
  setUser,
  toggleSettings,
  toggleStartANewChat,
} from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import CallHistory from "./CallHistory";
import MyContacts from "./MyContacts";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "@/hooks/useLocalStorage";

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { value: token } = useLocalStorage("token");
  const { openSettings, username } = useAppSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState<
    "messages" | "calls" | "contacts"
  >("messages");

  const tabs = [
    { id: "messages", icon: MessageSquareText, label: "Messages" },
    { id: "calls", icon: Phone, label: "Calls" },
    { id: "contacts", icon: SquareUser, label: "Contacts" },
  ];
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (token) {
      const { id, username, email, phone } = jwtDecode<{
        id: string;
        username: string;
        email: string;
        phone: string;
      }>(token as string);
      dispatch(setUser({ id, username, email, phone }));
    }
  }, [dispatch, token]);

  const menuOptions = [
    {
      icon: User,
      label: "My Profile",
      action: () => !openSettings && dispatch(toggleSettings()),
    },
    {
      icon: MessageSquare,
      label: "New Chat",
      action: () => dispatch(toggleStartANewChat()),
    },
    // {
    //   icon: Settings,
    //   label: "Settings",
    //   action: () => openSettings && dispatch(toggleSettings()),
    // },
    { icon: LogOut, label: "Logout", action: () => console.log("Logout") },
  ];

  useEffect(() => {
    const {
      id,
      username,
      email,
      phone,
    }: {
      id: string;
      username: string;
      email: string;
      phone: string;
    } = jwtDecode(token as string);
    dispatch(setUser({ id, username, email, phone }));
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="flex flex-col h-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shadow-sm">
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
            <h5 className="font-semibold text-gray-900">{username}</h5>
          </div>
        </div>
        <div className="flex gap-2 relative">
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
          <div ref={menuRef} className="relative">
            <button
              onClick={handleMenuToggle}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="More options"
              aria-expanded={isMenuOpen}
            >
              <Ellipsis className="w-5 h-5" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {menuOptions.map(({ icon: Icon, label, action }) => (
                  <button
                    key={label}
                    onClick={() => {
                      action();
                      setIsMenuOpen(false); // Close menu after action
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 
                      hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
        {selectedTab === "messages" && <ChatList />}
        {selectedTab === "calls" && <CallHistory />}
        {selectedTab === "contacts" && <MyContacts />}
      </div>
    </div>
  );
};

export default SideBar;
