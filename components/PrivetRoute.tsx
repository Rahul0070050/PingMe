"use client";

import { AuthState } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

interface PrivateRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

const PrivateRoute = ({
  children,
  redirectPath = "/login",
}: PrivateRouteProps) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push(redirectPath);
          return;
        }

        // Add your token verification logic here if needed
        setAuthState({
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Auth verification failed:", error);
        router.push(redirectPath);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router, redirectPath]);

  if (isLoading) {
    return <LoadingScreen size="md" color="blue-600" />;
  }

  if (!authState.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
