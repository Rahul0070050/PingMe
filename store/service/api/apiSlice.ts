"use client";

import {
  BASE_URL,
  USER_CONTACT_LIST_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
} from "@/backend/urls";
import { Contacts } from "@/type/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");

    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("token") as any);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

const baseQueryWithAuth: typeof baseQuery = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.data.message == "invalid token") {
    console.warn("Token expired or unauthorized access");

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    login: builder.mutation<
      { data: { token: string } },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: USER_LOGIN_URL,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<
      { message: string },
      { name: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: USER_REGISTER_URL,
        method: "POST",
        body: userData,
      }),
    }),
    getUsers: builder.query<Contacts[], void>({
      query: () => USER_CONTACT_LIST_URL,
    }),
  }),
});

// Export hooks for usage in components
export const { useLoginMutation, useRegisterMutation, useGetUsersQuery } =
  apiSlice;
