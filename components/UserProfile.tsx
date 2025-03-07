"use client";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleUserInfo } from "@/store/userSlice";
import profile from "../public/profile.jpeg";
import {
  Camera,
  ChevronRight,
  Dock,
  Facebook,
  Globe,
  Linkedin,
  Mail,
  MoveRight,
  Settings,
  Smartphone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { avatar, username, bio } = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-3 border-l">
      <div className="p-4 py-6 text-lg font-medium flex justify-between border-b">
        <h2>Contact Info</h2>
        <X
          className="text-slate-500 cursor-pointer hover:text-slate-600 transition-all"
          onClick={() => dispatch(toggleUserInfo())}
        />
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        {avatar && (
          <Image
            className="w-32 rounded-full"
            width={100}
            src={avatar}
            alt="profile"
          />
        )}
        <h3 className="text-xl font-medium mt-3 leading-5">{username}</h3>
        <p className="text-slate-500">{bio}</p>
        <div className="flex gap-3 mt-2">
          <Facebook className="text-slate-500 w-5 h-5 cursor-pointer hover:text-slate-600 transition-all" />
          <Linkedin className="text-slate-500 w-5 h-5 cursor-pointer hover:text-slate-600 transition-all" />
          <Twitter className="text-slate-500 w-5 h-5 cursor-pointer hover:text-slate-600 transition-all" />
          <Youtube className="text-slate-500 w-5 h-5 cursor-pointer hover:text-slate-600 transition-all" />
        </div>
      </div>
      <div className="px-6 flex flex-col gap-4">
        <div className="flex gap-2">
          <Smartphone className="text-slate-500 w-5 h-5" />
          <span className="text-slate-700 text-sm">+91 588734323</span>
        </div>
        <div className="flex gap-2">
          <Globe className="text-slate-500 w-5 h-5" />
          <span className="text-slate-700 text-sm">sample.web.com</span>
        </div>
        <div className="flex gap-2">
          <Mail className="text-slate-500 w-5 h-5" />
          <span className="text-slate-700 text-sm">sample@email.com</span>
        </div>
      </div>
      <div className="px-3 flex flex-col gap-3 pt-7">
        <div className="flex flex-col gap-3 text-slate-900 text-base">
          <div className="flex gap-3 text-slate-900 text-base">
            <Camera className="text-slate-500" />
            <h2 className="font-medium">Photos & Media</h2>
          </div>
          <div className="flex items-center gap-1">
            {[profile, profile, profile].map((iamge, index) => {
              return <Image key={index} width={70} src={iamge} alt="media" />;
            })}
            <div className="h-[71px] w-[71px] bg-slate-300 flex items-center justify-center relative">
              <ChevronRight className=" z-10 w-14 h-14 text-black/60 absolute" />
              <Image
                className="blur-[5px] z-0"
                width={70}
                src={profile}
                alt="media"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 text-slate-900 text-base">
          <Dock className="text-slate-500" />
          <h2 className="font-medium">Documents</h2>
        </div>
        <div className="flex gap-3 text-slate-900 text-base">
          <Settings className="text-slate-500" />
          <h2 className="font-medium">Settings</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
