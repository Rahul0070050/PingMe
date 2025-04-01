"use client";
import { BASE_SOCKET_URL } from "@/backend/urls";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const isConnected = useRef(false);
  const { value: token } = useLocalStorage("token");

  useEffect(() => {
    if (!isConnected.current && token) {
      console.log("Socket connecting...");
      const newSocket = io(BASE_SOCKET_URL || "http://localhost:3001/user", {
        transports: ["websocket"],
        reconnection: true,
        auth: { token },
      });
      setSocket(newSocket);
      isConnected.current = true;

      return () => {
        console.log("Socket disconnecting...");
        newSocket.disconnect();
        isConnected.current = false;
      };
    }
  }, [token]); // Added 'token' as a dependency

  if (!socket) return null; // Prevent rendering child components until socket is ready

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
