import { createSlice } from "@reduxjs/toolkit";
import profile from "../public/profile.jpeg";
import { StaticImageData } from "next/image";

type INITIALSTATE = {
  id?: number;
  username?: string;
  avatar?: StaticImageData;
};
const initialState: INITIALSTATE = {
  id: 1,
  username: "Rahul O R",
  avatar: profile,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    removeUser: (state) => {
      state = {};
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice;
