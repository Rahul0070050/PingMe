"use client";

import React, { useState, FormEvent, useEffect } from "react";
import {
  Camera,
  Mic,
  Paperclip,
  SendHorizontal,
  SmileIcon,
} from "lucide-react";
import { useSocket } from "@/hooks/useSocket";

const SendMessage = ({
  handleSendMessage,
}: {
  handleSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // socket.emit("send-message", { message });
      handleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center p-2 sm:p-4 border-t border-gray-200 bg-white shadow-sm w-full">
      <button
        className="hidden sm:block p-1 sm:p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Add emoji"
      >
        <SmileIcon className="w-5 h-5" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-1 mx-1 sm:mx-3 bg-gray-50 border border-gray-200 rounded-full p-1 sm:p-2 shadow-inner"
      >
        <input
          className="flex-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400 
            outline-none focus:ring-0 w-full"
          placeholder="Type a message..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Message input"
        />
        <div className="flex gap-1 sm:gap-2 text-gray-500 pr-1 sm:pr-2">
          <button
            type="button"
            className="p-1 sm:p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 rotate-45" />
          </button>
          <button
            type="button"
            className="hidden sm:block p-1 sm:p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Take photo"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            className="hidden sm:block p-1 sm:p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Record voice message"
          >
            <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>
      <button
        onClick={handleSubmit}
        disabled={!message.trim()}
        className="p-1.5 sm:p-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full 
          disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Send message"
      >
        <SendHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default SendMessage;
