"use client";
import React, { useEffect } from "react";
import { openSideBar } from "@/store/userSlice";
import { useAppDispatch } from "@/store/hook";
import { Contacts } from "@/type/user";
import UserAvatar from "./UserAvatar";
import { setAllContacts, setSelectedUser } from "@/store/chatSlice";
import { useGetUsersQuery } from "@/store/service/api/apiSlice";

const MyContacts = () => {
  const dispatch = useAppDispatch();
  const { error, data: contacts, isLoading } = useGetUsersQuery();
  useEffect(() => {
    if (Array.isArray(contacts)) {
      const AllContacts = contacts as Contacts[];
      dispatch(setAllContacts(AllContacts));
    }
  }, [contacts]);

  function handleClick(username: string, profile: string, userId: string) {
    dispatch(
      setSelectedUser({ lastSeen: "", username, profile, socketId: "", userId })
    );
    dispatch(openSideBar());
  }

  return (
    <div className="p-3 h-[calc(100vh-10vh-73px)] overflow-auto">
      {isLoading && <h2>Loading...</h2>}
      {!isLoading &&
        contacts &&
        contacts.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer"
            onClick={() => handleClick(user.username, user.profile, user.id)}
          >
            <UserAvatar name={user.username} profileUrl={user.profile} />
            <div className="">
              <h5 className="font-medium">{user.username}</h5>
              <span className="text-slate-500">{user.bio}...</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyContacts;
