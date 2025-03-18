import { BASE_SOCKET_URL } from "@/backend/urls";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (token?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(BASE_SOCKET_URL, { auth: { token } });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
