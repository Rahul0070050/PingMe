import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";
import { Contacts } from "@/type/user";

interface LastMessage {
  userId?: string;
  message: string;
  time: Date;
}

interface User {
  id: string;
  username: string;
  bio: string;
  avatar: StaticImageData | string | null;
  email?: string;
  phone?: string;
  lastMessage?: LastMessage;
  unreadChat: boolean;
}

interface UserState {
  user: User[];
  contacts: Contacts[];
}

const initialState: UserState = {
  user: [],
  contacts: [],
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<User[]>) => {
      state.user = action.payload;
    },
    setLastMessage: (state, action: PayloadAction<LastMessage>) => {
      const { userId, message, time } = action.payload;
      const user = state.user.find((user) => user.id === userId);
      if (user) {
        user.lastMessage = { message, time };
      }
    },
    setAllContacts: (state, action: PayloadAction<Contacts[]>) => {
      state.contacts = action.payload;
    },
  },
});

export const { setChats, setLastMessage, setAllContacts } = chatSlice.actions;

export default chatSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user;
