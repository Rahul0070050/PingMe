"use client";
import { SocketContext } from "@/app/socketContext";
import { useContext } from "react";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
