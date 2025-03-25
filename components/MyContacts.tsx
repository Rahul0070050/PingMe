"use client";
import React, { useEffect, useState } from "react";
import { openSideBar } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import useAxios from "@/hooks/useAxios";
import { Contacts } from "@/type/user";
import UserAvatar from "./UserAvatar";
import { setAllContacts } from "@/store/chatSlice";

const MyContacts = () => {
  const { contacts } = useAppSelector((store) => store.chat);
  const dispatch = useAppDispatch();
  const { loading, fetchData, data } = useAxios("/user/list", "GET");

  useEffect(() => {
    if (contacts.length <= 0) {
      fetchData();
    }

    if (contacts.length <= 0 && Array.isArray(data)) {
      const contacts = data as Contacts[];
      dispatch(setAllContacts(contacts));
    }
  }, [data]);

  return (
    <div className="p-3 h-[calc(100vh-10vh-73px)] overflow-auto">
      {loading && <h2>Loading...</h2>}
      {!loading &&
        contacts &&
        contacts.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer"
            onClick={() => dispatch(openSideBar())}
          >
            {/* {user.profile ? (
              <Image
                className="rounded-full"
                width={45}
                height={45}
                src={profile}
                alt="profile"
              />
            ) : (
              <div></div>
            )} */}
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
