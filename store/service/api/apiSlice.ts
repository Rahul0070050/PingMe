import { BASE_URL, USER_CONTACT_LIST_URL } from "@/backend/urls";
import { Contacts } from "@/type/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<Contacts[], void>({
      query: () => USER_CONTACT_LIST_URL,
    }),
    // getUserById: builder.query<User, number>({
    //   query: (id) => `/users/${id}`,
    // }),
    // createUser: builder.mutation<User, Partial<User>>({
    //   query: (newUser) => ({
    //     url: "/users",
    //     method: "POST",
    //     body: newUser,
    //   }),
    // }),
  }),
});

// Export hooks for usage in components
export const { useGetUsersQuery } = apiSlice;
