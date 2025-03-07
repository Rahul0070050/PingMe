import Image from "next/image";
import React from "react";
import profile from "../public/profile.jpeg";

const users = [
  {
    user_id: 1,
    name: "Alice",
    bio: "Software engineer with a love for AI and cloud computing.",
  },
  {
    user_id: 2,
    name: "Bob",
    bio: "Cybersecurity enthusiast and ethical hacker.",
  },
  {
    user_id: 3,
    name: "Charlie",
    bio: "Web developer passionate about frontend frameworks and UX design.",
  },
  {
    user_id: 4,
    name: "David",
    bio: "Data scientist exploring machine learning and big data analytics.",
  },
  {
    user_id: 5,
    name: "Eve",
    bio: "Blockchain developer diving into Web3 and DeFi projects.",
  },
  {
    user_id: 6,
    name: "Frank",
    bio: "Full-stack developer working with MERN and cloud technologies.",
  },
  {
    user_id: 7,
    name: "Grace",
    bio: "Mobile app developer focused on React Native and Flutter.",
  },
  {
    user_id: 8,
    name: "Hank",
    bio: "DevOps engineer automating infrastructure and deployments.",
  },
  {
    user_id: 9,
    name: "Ivy",
    bio: "UI/UX designer creating user-friendly digital experiences.",
  },
  {
    user_id: 10,
    name: "Jack",
    bio: "Embedded systems developer passionate about IoT and robotics.",
  },
];

const MyContacts = () => {
  return (
    <div className="p-3 h-[calc(100vh-10vh-73px)] overflow-auto">
      {users.map((user) => (
        <div className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer">
          <Image
            className="rounded-full"
            width={45}
            height={45}
            src={profile}
            alt="profile"
          />
          <div className="">
            <h5 className="font-medium">{user.name}</h5>
            <span className="text-slate-500">{user.bio.slice(0, 25)}...</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyContacts;
