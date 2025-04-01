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
  const { value: token } = useLocalStorage<string>("token", null);
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

  return <>{children}</>;
};

export default PrivateRoute;
