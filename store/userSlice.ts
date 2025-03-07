import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import profile from "../public/profile.jpeg";
import { StaticImageData } from "next/image";

interface UserState {
  id: number;
  username: string;
  bio: string;
  avatar: StaticImageData | string | null;
  email?: string;
  openUserInfo: boolean;
  openUserSettings: boolean;
}

const initialState: UserState = {
  id: 1,
  username: "Rahul O R",
  bio: "Web Developer",
  avatar: profile,
  email: "rahul@example.com",
  openUserInfo: false,
  openUserSettings: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    removeUser: (state) => {
      return {
        ...initialState,
        id: -1,
        username: "",
        bio: "",
        avatar: null,
        email: "",
        openUserInfo: false,
        openUserSettings: false,
      };
    },
    toggleUserInfo: (state) => {
      state.openUserInfo = !state.openUserInfo;
    },
    toggleUserSettings: (state) => {
      state.openUserSettings = !state.openUserSettings;
      state.openUserInfo = !state.openUserInfo;
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
} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user;
