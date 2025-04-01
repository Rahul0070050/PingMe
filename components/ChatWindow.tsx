"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useSocket } from "@/hooks/useSocket";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setLastSeen,
  setSelectedUserLoading,
  setSelectedUserSocketId,
} from "@/store/chatSlice";
import LoadingScreen from "./LoadingScreen";

interface MessageData {
  message: string;
  date: Date;
  senderId: string;
  receiverId: string;
}

interface ClientInfo {
  isOnline: boolean;
  userClientId: string;
  lastSeen: string;
  messages: MessageData[];
}

const ChatWindow: React.FC = () => {
  const bottumRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const limitRef = useRef<number>(15);

  const {
    chat: {
      selectedUser: { userId: selectedUserId, loading },
    },
    user: { id },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [shouldscroll, setShouldScroll] = useState<boolean>(false);

  const { socket } = useSocket();

  useEffect(() => {
    if (shouldscroll) {
      scrollToBottom();
    }
  }, [messages, shouldscroll]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: MessageData[]) => {
      setMessages((prev) => [...prev, ...msg]);
    };

    const handleOlderMessages = (olderMessages: MessageData[]) => {
      setMessages((prevMessages) => [...olderMessages, ...prevMessages]);
      limitRef.current = limitRef.current + 15;
    };

    socket.on("get-message", handleNewMessage);
    socket.on("get-older-messages", handleOlderMessages);

    return () => {
      socket.off("get-message", handleNewMessage);
      socket.off("get-older-messages", handleOlderMessages);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.emit(
      "get-client-info",
      { selectedUserId },
      (clientInfo: ClientInfo) => {
        const { isOnline, lastSeen, userClientId, messages } = clientInfo;
        setMessages(messages);
        dispatch(setSelectedUserLoading({ loading: false }));
        limitRef.current = 15;
        setShouldScroll(true);

        if (isOnline) {
          dispatch(setSelectedUserSocketId({ userClientId }));
        } else {
          dispatch(setLastSeen({ lastSeen }));
        }
      }
    );
  }, [selectedUserId, socket, dispatch]);

  const loadMoreMessages = useCallback(() => {
    if (socket) {
      socket.emit("get-older-messages", {
        selectedUserId,
        limit: limitRef.current,
      });
    }
  }, [socket, selectedUserId]);

  useEffect(() => {
    if (!topRef.current || !scrollRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadMoreMessages();
        }
      },
      {
        root: scrollRef.current,
        threshold: 0.1,
      }
    );

    observerRef.current.observe(topRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [topRef.current, selectedUserId, loadMoreMessages]);

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }

  const handleSubmit = (message: string) => {
    try {
      if (socket) {
        const newMessage: MessageData = {
          message,
          date: new Date(),
          senderId: id,
          receiverId: selectedUserId,
        };

        scrollToBottom();

        setMessages((prev) => [...prev, newMessage]);

        socket.emit("send-message", {
          message,
          receiverId: selectedUserId,
          date: new Date(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-inner">
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <ChatHeader />
      </div>

      {!loading ? (
        messages.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex-1 px-4 py-6 overflow-y-auto bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            <div ref={topRef} className="h-1" />
            {messages.map((message, index) => (
              <Message key={`${message.date}-${index}`} message={message} />
            ))}
            <div ref={bottumRef} className="h-1" />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )
      ) : (
        <LoadingScreen />
      )}

      <div className="border-t border-gray-200 bg-white p-4">
        <SendMessage handleSendMessage={handleSubmit} />
      </div>
    </div>
  );
};

export default ChatWindow;
