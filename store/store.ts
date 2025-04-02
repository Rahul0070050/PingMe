"use client";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";
import { apiSlice } from "./service/api/apiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      chat: chatSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
