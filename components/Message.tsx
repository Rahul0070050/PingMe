"use client";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hook";
import React from "react";
import moment from "moment";

interface MessageProps {
  message: string;
  date: Date;
  receiverId: string;
  senderId: string;
}

const Message = ({ message }: { message: MessageProps }) => {
  const { id } = useAppSelector((state) => state.user);
  const isOwnMessage = id === message.senderId;

  return (
    <div
      className={cn(
        "w-fit max-w-[70%] p-3 rounded-xl flex flex-col my-2 shadow-sm transition-all duration-200",
        isOwnMessage
          ? "ml-auto bg-indigo-600 rounded-tr-none text-white"
          : "mr-auto bg-gray-100 rounded-tl-none text-gray-900"
      )}
    >
      <p className="text-base break-words">{message.message}</p>
      <span
        className={cn(
          "text-xs mt-1 opacity-80",
          isOwnMessage ? "text-white ml-auto" : "text-gray-600"
        )}
      >
        {moment(message.date).format("hh:mm A")}
      </span>
    </div>
  );
};

export default Message;
