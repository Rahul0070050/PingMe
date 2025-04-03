"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
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

  useEffect(() => {
    if (!token) {
      router.replace(redirectPath);
    }
  }, [token, router, redirectPath]);

  if (!token) {
    return (
      <LoadingScreen message={loadingMessage} size="md" color="blue-600" />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
