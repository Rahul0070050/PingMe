"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useSocket } from "@/hooks/useSocket";

interface MessageData {
  message: string;
  sender: number;
  date: string;
}

const ChatWindow: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  // const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    console.log("socketio");

    socket.on("get-messages", (msg: MessageData[]) => {
      console.log("msg ", msg);
      setMessages((prev) => [...prev, ...msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSubmit = (message: string) => {
    alert();
    if (socket && message.trim()) {
      socket.emit("send-message", { message });
      // setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-inner">
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <ChatHeader />
      </div>
      <div
        className="flex-1 px-4 py-6 overflow-y-auto bg-gray-50 space-y-4 scrollbar-thin 
          scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {messages.length > 0 ? (
          <>
            {messages.map((message, index) => (
              <Message key={`${message.date}-${index}`} message={message} />
            ))}
            <div ref={scrollRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-white p-4">
        <SendMessage handleSendMessage={handleSubmit} />
      </div>
    </div>
  );
};

export default ChatWindow;
