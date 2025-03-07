"use client";

import React, { useState, FormEvent } from "react";
import {
  Camera,
  Mic,
  Paperclip,
  SendHorizontal,
  SmileIcon,
} from "lucide-react";

const SendMessage: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center p-4 border-t border-gray-200 bg-white shadow-sm">
      <button
        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Add emoji"
      >
        <SmileIcon className="w-5 h-5" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-1 mx-3 bg-gray-50 border border-gray-200 rounded-full p-2 shadow-inner"
      >
        <input
          className="flex-1 px-3 py-1 bg-transparent text-base text-gray-900 placeholder-gray-400 
            outline-none focus:ring-0"
          placeholder="Type a message..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Message input"
        />
        <div className="flex gap-3 text-gray-500 pr-2">
          <button
            type="button"
            className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5 rotate-45" />
          </button>
          <button
            type="button"
            className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Take photo"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-1 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Record voice message"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </form>
      <button
        onClick={handleSubmit}
        disabled={!message.trim()}
        className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full 
          disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Send message"
      >
        <SendHorizontal className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SendMessage;
