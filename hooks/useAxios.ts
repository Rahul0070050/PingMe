import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useAxios = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  options: AxiosRequestConfig = {}
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (body: any = null) => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios({
          url,
          method,
          data: body,
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });
        setData(response.data);
        return { data: response.data, error: null }; // Return response
      } catch (error: any) {
        const errorMsg = error.response?.data || "Something went wrong";
        setError(errorMsg);
        return { data: null, error: errorMsg }; // Return error
      } finally {
        setLoading(false);
      }
    },
    [url, method, options]
  );

  return { loading, fetchData };
};

export default useAxios;
