"use client";

import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import SendMessage from "./SendMessage";

interface MessageData {
  message: string;
  sender: number;
  date: string;
}

const messages: MessageData[] = [
  {
    message: "That sounds awesome! Are you using WebRTC for the video calls?",
    sender: 2,
    date: "2025-03-06T10:05:00Z",
  },
  {
    message:
      "Yeah, WebRTC for real-time communication and getstream.io for chat features.",
    sender: 1,
    date: "2025-03-06T10:06:00Z",
  },
  {
    message:
      "That's a solid tech stack! Are you handling authentication yourself?",
    sender: 2,
    date: "2025-03-06T10:07:00Z",
  },
  {
    message:
      "Nope, I'm using Clerk for authentication. It simplifies things a lot!",
    sender: 1,
    date: "2025-03-06T10:08:00Z",
  },
  {
    message: "Clerk is great! Are you planning to add any extra features?",
    sender: 2,
    date: "2025-03-06T10:09:00Z",
  },
  {
    message: "Yeah, I want to add meeting scheduling and recording features.",
    sender: 1,
    date: "2025-03-06T10:10:00Z",
  },
  {
    message:
      "That would make it super useful! Let me know if you need a tester. 😃",
    sender: 2,
    date: "2025-03-06T10:11:00Z",
  },
  {
    message:
      "Thanks! I'll definitely reach out once I have a beta version ready.",
    sender: 1,
    date: "2025-03-06T10:12:00Z",
  },
  {
    message:
      "That's a solid tech stack! Are you handling authentication yourself?",
    sender: 2,
    date: "2025-03-06T10:07:00Z",
  },
  {
    message:
      "Nope, I'm using Clerk for authentication. It simplifies things a lot!",
    sender: 1,
    date: "2025-03-06T10:08:00Z",
  },
  {
    message: "Clerk is great! Are you planning to add any extra features?",
    sender: 2,
    date: "2025-03-06T10:09:00Z",
  },
  {
    message: "Yeah, I want to add meeting scheduling and recording features.",
    sender: 1,
    date: "2025-03-06T10:10:00Z",
  },
  {
    message:
      "That would make it super useful! Let me know if you need a tester. 😃",
    sender: 2,
    date: "2025-03-06T10:11:00Z",
  },
  {
    message:
      "Thanks! I'll definitely reach out once I have a beta version ready.",
    sender: 1,
    date: "2025-03-06T10:12:00Z",
  },
];

const ChatWindow: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

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
          messages.map((message, index) => (
            <Message key={`${message.date}-${index}`} message={message} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      <div ref={scrollRef} />
      <div className="border-t border-gray-200 bg-white p-4">
        <SendMessage />
      </div>
    </div>
  );
};

export default ChatWindow;
