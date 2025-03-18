"use client";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleUserInfo, toggleUserSettings } from "@/store/userSlice";
import {
  Camera,
  ChevronRight,
  Dock,
  Facebook,
  Globe,
  Linkedin,
  Mail,
  Settings,
  Smartphone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import profile from "../public/profile.jpeg";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { avatar, username, bio } = useAppSelector((state) => state.user);

  const socialIcons = [
    { icon: Facebook, label: "Facebook" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Twitter, label: "Twitter" },
    { icon: Youtube, label: "YouTube" },
  ];

  const contactInfo = [
    { icon: Smartphone, text: "+91 588734323", label: "Phone number" },
    { icon: Globe, text: "sample.web.com", label: "Website" },
    { icon: Mail, text: "sample@email.com", label: "Email" },
  ];

  const handleClose = () => {
    dispatch(toggleUserInfo());
  };

  return (
    <div className="flex flex-col h-full bg-white border-l py-4 border-gray-200 shadow-md">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-lg font-semibold text-gray-900">Contact Info</h2>
        <button
          onClick={handleClose}
          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col items-center py-6 px-4">
        {avatar ? (
          <Image
            className="w-24 h-24 rounded-full border border-gray-200 shadow-sm object-cover"
            width={96}
            height={96}
            src={avatar}
            alt={`${username || "User"}'s profile picture`}
            priority
          />
        ) : (
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-3xl shadow-sm">
            {username ? username[0].toUpperCase() : "?"}
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mt-3">
          {username || "Unknown User"}
        </h3>
        <p className="text-sm text-gray-500 text-center mt-1">
          {bio || "No bio available"}
        </p>
        <div className="flex gap-3 mt-4">
          {socialIcons.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`Visit ${label}`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        {contactInfo.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 py-2">
            <Icon className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">{text}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 px-6 py-4 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Photos & Media</h3>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {[profile, profile, profile].map((image, index) => (
              <Image
                key={index}
                className="w-16 h-16 rounded-md object-cover shadow-sm"
                width={64}
                height={64}
                src={image}
                alt={`Media ${index + 1}`}
              />
            ))}
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center relative cursor-pointer hover:bg-gray-300 transition-all duration-200">
              <Image
                className="w-full h-full object-cover blur-sm absolute"
                width={64}
                height={64}
                src={profile}
                alt="More media preview"
              />
              <ChevronRight className="w-8 h-8 text-gray-700 z-10" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Dock className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Documents</h3>
        </div>
        <div
          className="flex items-center gap-3"
          onClick={() => dispatch(toggleUserSettings())}
        >
          <Settings className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Settings</h3>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
