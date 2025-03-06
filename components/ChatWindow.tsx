import React from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";

const messages = [
  { message: "Hey, how are you?", sender: 1, date: "2025-03-06T10:00:00Z" },
  {
    message: "I'm good! How about you?",
    sender: 2,
    date: "2025-03-06T10:01:00Z",
  },
  {
    message: "Doing well, just working on a project.",
    sender: 1,
    date: "2025-03-06T10:02:00Z",
  },
  {
    message: "Nice! What kind of project?",
    sender: 2,
    date: "2025-03-06T10:03:00Z",
  },
  {
    message: "A video calling website using Next.js!",
    sender: 1,
    date: "2025-03-06T10:04:00Z",
  },
];
const ChatWindow = () => {
  return (
    <div>
      <ChatHeader />
      <div className={`flex flex-col px-4`}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
