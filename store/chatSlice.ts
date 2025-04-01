import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";
import { Contacts } from "@/type/user";

interface LastMessage {
  userId?: string;
  message: string;
  time: Date;
}

interface SelectedUser {
  username: string;
  lastSeen: string;
  profile: string;
  socketId: string;
  userId: string;
  loading: boolean;
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
  selectedUser: SelectedUser;
}

const initialState: UserState = {
  user: [],
  contacts: [],
  selectedUser: {
    username: "",
    lastSeen: "",
    profile: "",
    socketId: "",
    userId: "",
    loading: false,
  },
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
    setSelectedUser: (state, action: PayloadAction<SelectedUser>) => {
      const { payload } = action;
      state.selectedUser = {
        username: payload.username,
        lastSeen: payload.lastSeen,
        profile: payload.profile,
        socketId: payload.socketId,
        userId: payload.userId,
        loading: true,
      };
    },
    setSelectedUserLoading: (
      state,
      action: PayloadAction<{ loading: boolean }>
    ) => {
      state.selectedUser.loading = action.payload.loading;
    },
    setSelectedUserSocketId: (
      state,
      action: PayloadAction<{ userClientId: string }>
    ) => {
      const { payload } = action;
      state.selectedUser = {
        ...state.selectedUser,
        socketId: payload.userClientId,
        lastSeen: "",
      };
    },
    setLastSeen: (state, action: PayloadAction<{ lastSeen: string }>) => {
      const { payload } = action;
      state.selectedUser = {
        ...state.selectedUser,
        lastSeen: payload.lastSeen,
        socketId: "",
      };
    },
  },
});

export const {
  setChats,
  setLastMessage,
  setAllContacts,
  setSelectedUser,
  setSelectedUserSocketId,
  setLastSeen,
  setSelectedUserLoading,
} = chatSlice.actions;

export default chatSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user;
