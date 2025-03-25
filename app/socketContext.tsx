"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
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
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!isConnected.current) {
      console.log("Socket connecting...");
      const newSocket = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001/user",
        { transports: ["websocket"], reconnection: true, auth: { token } }
      );
      setSocket(newSocket);
      isConnected.current = true;

      return () => {
        console.log("Socket disconnecting...");
        newSocket.disconnect();
        isConnected.current = false;
      };
    }
  }, []);

  if (!socket) return null; // Prevent rendering child components until socket is ready

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
