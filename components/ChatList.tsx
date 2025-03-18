"use client";
import Image from "next/image";
import React from "react";
import profile from "../public/profile.jpeg";
import { useAppDispatch } from "@/store/hook";
import { closeSideBar } from "@/store/userSlice";

const chathistory = [
  {
    user_id: "1",
    name: "Alice",
    message: "Hey, are we still on for the meeting?",
    timestamp: "2025-03-07T14:05:30Z",
  },
  {
    user_id: "2",
    name: "Bob",
    message: "Sure, I'll send the files soon.",
    timestamp: "2025-03-07T13:45:10Z",
  },
  {
    user_id: "3",
    name: "Charlie",
    message: "Great job on the project! 🎉",
    timestamp: "2025-03-07T12:55:20Z",
  },
  {
    user_id: "4",
    name: "David",
    message: "Let's catch up later.",
    timestamp: "2025-03-07T11:30:45Z",
  },
  {
    user_id: "5",
    name: "Eve",
    message: "Haha, that was hilarious! 😂",
    timestamp: "2025-03-07T10:15:00Z",
  },
  {
    user_id: "1",
    name: "Alice",
    message: "Hey, are we still on for the meeting?",
    timestamp: "2025-03-07T14:05:30Z",
  },
  {
    user_id: "2",
    name: "Bob",
    message: "Sure, I'll send the files soon.",
    timestamp: "2025-03-07T13:45:10Z",
  },
  {
    user_id: "3",
    name: "Charlie",
    message: "Great job on the project! 🎉",
    timestamp: "2025-03-07T12:55:20Z",
  },
  {
    user_id: "4",
    name: "David",
    message: "Let's catch up later.",
    timestamp: "2025-03-07T11:30:45Z",
  },
  {
    user_id: "5",
    name: "Eve",
    message: "Haha, that was hilarious! 😂",
    timestamp: "2025-03-07T10:15:00Z",
  },
  {
    user_id: "1",
    name: "Alice",
    message: "Hey, are we still on for the meeting?",
    timestamp: "2025-03-07T14:05:30Z",
  },
  {
    user_id: "2",
    name: "Bob",
    message: "Sure, I'll send the files soon.",
    timestamp: "2025-03-07T13:45:10Z",
  },
  {
    user_id: "3",
    name: "Charlie",
    message: "Great job on the project! 🎉",
    timestamp: "2025-03-07T12:55:20Z",
  },
  {
    user_id: "4",
    name: "David",
    message: "Let's catch up later.",
    timestamp: "2025-03-07T11:30:45Z",
  },
  {
    user_id: "5",
    name: "Eve",
    message: "Haha, that was hilarious! 😂",
    timestamp: "2025-03-07T10:15:00Z",
  },
];

const ChatList = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="p-3 h-[calc(100vh-10vh-100px)] max-sm:h-[calc(100vh-10vh-85px)] overflow-auto">
      {chathistory.map((user) => (
        <div
          className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer"
          onClick={() => dispatch(closeSideBar())}
        >
          <Image
            className="rounded-full"
            width={45}
            height={45}
            src={profile}
            alt="profile"
          />
          <div className="">
            <h5 className="font-medium">{user.name}</h5>
            <span className="text-slate-500">
              {user.message.slice(0, 25)}...
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
