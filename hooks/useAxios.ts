"use client";
import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from "next/navigation";

const useAxios = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  options: AxiosRequestConfig = {}
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const { value: token } = useLocalStorage<string | undefined>(
    "token",
    undefined
  );

  const fetchData = useCallback(
    async (body: any = null) => {
      setError(null);
      setLoading(true);

      try {
        const headers: Record<any, any> = {
          "Content-Type": "application/json",
          ...(options?.headers ? options.headers : {}),
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios({
          url,
          method,
          data: body,
          ...options,
          headers,
        });

        setData(response.data);
        return { data: response.data, error: null };
      } catch (error: any) {
        console.error("API request failed:", error);
        if (error instanceof AxiosError) {
          if (error.response?.data.message === "jwt expired") {
            navigate.push("/login");
          }
        }

        let errorMsg = "Something went wrong";
        if (axios.isAxiosError(error)) {
          errorMsg = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
          errorMsg = error.message;
        }

        setError(errorMsg);
        return { data: null, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [url, method, options, token] // ✅ Ensures updated token & options
  );

  return { loading, fetchData, data, error };
};

export default useAxios;
