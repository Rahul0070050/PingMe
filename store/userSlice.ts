import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import profile from "../public/profile.jpeg";
import { StaticImageData } from "next/image";
import { Socket } from "socket.io-client";

interface UserState {
  id: string;
  username: string;
  bio: string;
  avatar: string;
  email?: string;
  phone?: string;
  openUserInfo: boolean;
  openUserSettings: boolean;
  openSettings: boolean;
  openStartNewChat: boolean;
  showSideBar: boolean;
  lastSeen: string;
}

const initialState: UserState = {
  id: "",
  username: "",
  bio: "",
  avatar: "",
  email: "",
  phone: "",
  openUserInfo: false,
  openUserSettings: false,
  openSettings: false,
  openStartNewChat: false,
  showSideBar: true,
  lastSeen: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    removeUser: (state) => {
      return {
        ...initialState,
        id: "",
        username: "",
        bio: "",
        avatar: "",
        email: "",
        openUserInfo: false,
        openUserSettings: false,
        openStartNewChat: false,
        showSideBar: true,
      };
    },
    toggleUserInfo: (state) => {
      state.openUserInfo = !state.openUserInfo;
    },
    toggleUserSettings: (state) => {
      state.openUserInfo = false;
      state.openStartNewChat = false;
      state.openUserSettings = !state.openUserSettings;
    },
    toggleSettings: (state) => {
      state.openStartNewChat = false;
      state.openUserSettings = false;
      state.showSideBar = !state.showSideBar;
      state.openSettings = !state.openSettings;
    },
    toggleStartANewChat: (state) => {
      state.openSettings = false;
      state.openUserSettings = false;
      state.showSideBar = !state.showSideBar;
      state.openStartNewChat = !state.openStartNewChat;
    },
    openSideBar: (state) => {
      state.showSideBar = true;
    },
    closeSideBar: (state) => {
      state.showSideBar = false;
    },
    updateUserField: (
      state,
      action: PayloadAction<{ field: keyof UserState; value: any }>
    ) => {
      const { field, value } = action.payload;
      // @ts-ignore
      state[field] = value;
    },
  },
});

export const {
  setUser,
  removeUser,
  toggleUserInfo,
  updateUserField,
  toggleUserSettings,
  toggleSettings,
  toggleStartANewChat,
  openSideBar,
  closeSideBar,
} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user;
