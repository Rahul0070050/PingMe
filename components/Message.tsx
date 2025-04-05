"use client";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hook";
import React from "react";
import moment from "moment";
import { Clock, Eye, EyeClosed } from "lucide-react";

interface MessageProps {
  id: string;
  message: string;
  date: Date;
  receiverId: string;
  senderId: string;
  loading: boolean;
  seen: boolean;
}

const Message = ({ message }: { message: MessageProps }) => {
  const renderStatusIcon = () => {
    if (!isOwnMessage) return null;

    if (message.loading && !message.seen) return <Clock className="w-4 h-4" />;
    if (!message.loading && message.seen) return <Eye className="w-4 h-4" />;
    if (!message.loading && !message.seen)
      return <EyeClosed className="w-4 h-4" />;
    return null;
  };
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
          "text-xs mt-1 opacity-80 flex gap-2",
          isOwnMessage ? "text-white ml-auto" : "text-gray-600"
        )}
      >
        {moment(message.date).format("hh:mm A")}
        {renderStatusIcon()}
      </span>
    </div>
  );
};

export default Message;
