"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hook";
import React from "react";

type PROPS = {
  message: {
    message: string;
    sender: number;
    date: string;
  };
};
const Message = ({ message }: PROPS) => {
  const { id } = useAppSelector((state) => state.user);
  return (
    <div
      className={cn(
        "w-fit text-lg p-3 px-4 rounded-xl flex flex-col",
        id === message.sender
          ? "ml-auto bg-blue-500 rounded-tr-none"
          : "bg-slate-200 rounded-tl-none"
      )}
    >
      <p
        className={cn(
          id == message.sender ? "text-slate-100" : "text-gray-900"
        )}
      >
        {message.message}
      </p>
      <span
        className={cn(
          "text-sm mt-1",
          id == message.sender ? "text-slate-100 ml-auto" : "text-gray-900"
        )}
      >
        {new Date(message.date).toLocaleDateString()}
      </span>
    </div>
  );
};

export default Message;
