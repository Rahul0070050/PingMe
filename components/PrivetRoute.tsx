// components/PrivateRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import useLocalStorage from "@/hooks/useLocalStorage";

interface PrivateRouteProps {
  children: ReactNode;
  redirectPath?: string;
  loadingMessage?: string;
}

const PrivateRoute = ({
  children,
  redirectPath = "/login",
  loadingMessage = "Verifying access...",
}: PrivateRouteProps) => {
  const router = useRouter();
  const [token, , removeToken] = useLocalStorage<string>("token", null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (!token) {
          router.push(redirectPath);
          return;
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        router.push(redirectPath);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router, redirectPath, token]);

  if (isLoading) {
    return (
      <LoadingScreen message={loadingMessage} size="md" color="blue-600" />
    );
  }

  if (!token) {
    return null;
  }

  return (
    <>
      {children}
      <button
        onClick={removeToken}
        className="fixed bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </>
  );
};

export default PrivateRoute;
