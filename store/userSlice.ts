import { createSlice } from "@reduxjs/toolkit";
import profile from "../public/profile.jpeg";
import { StaticImageData } from "next/image";

type INITIALSTATE = {
  id?: number;
  username?: string;
  bio: string;
  avatar?: StaticImageData;
  openUserInfo?: boolean;
};
const initialState: INITIALSTATE = {
  id: 1,
  username: "Rahul O R",
  bio: "web developer",
  avatar: profile,
  openUserInfo: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    removeUser: (state) => {
      state = {
        id: -1,
        username: "",
        bio: "",
        openUserInfo: false,
      };
    },
    toggleUserInfo: (state) => {
      state.openUserInfo = !state.openUserInfo;
    },
  },
});

export const { setUser, removeUser, toggleUserInfo } = userSlice.actions;

export default userSlice;
