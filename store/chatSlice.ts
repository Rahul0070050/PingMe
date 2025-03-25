import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import profile from "../public/profile.jpeg";
import { StaticImageData } from "next/image";

interface LastMessage {
  userId?: number;
  message: string;
  time: Date;
}

interface User {
  id: number;
  username: string;
  bio: string;
  avatar: StaticImageData | string | null;
  email?: string;
  phone?: string;
  lastMessage?: LastMessage;
  unreadChat: boolean;
}
interface UserState {
  user?: User[];
}

const initialState: UserState = {
  user: [],
};
const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Partial<User>>) => {
      state = { ...state, ...action.payload };
    },
    setLastMessage: (state, action: PayloadAction<Partial<LastMessage>>) => {
      const { payload } = action;
      state.user?.filter((user) => {
        if (user.id == payload.userId) {
          if (payload.message && payload.time) {
            user["lastMessage"] = {
              message: payload.message,
              time: payload.time,
            };
          }
        }
      });
    },
  },
});

export const { setChats, setLastMessage } = chatSlice.actions;

export default chatSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user;
