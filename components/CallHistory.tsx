"use client";
import Image from "next/image";
import React from "react";
import profile from "../public/profile.jpeg";
import moment from "moment";
import {
  Phone,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
} from "lucide-react";
import { useAppSelector } from "@/store/hook";

// Call ID (Unique identifier)
// Caller ID (User who initiated the call)
// Receiver ID (User who received the call)
// Call Type (Voice or Video)
// Call Status (Missed, Completed, Rejected, Ongoing)
// Start Time (Timestamp of when the call started)
// End Time (Timestamp of when the call ended)
const callHistory = [
  // Outgoing Completed Call (Video)
  {
    call_id: "1001",
    caller_id: 1,
    caller_name: "Alice",
    caller_profile: "https://example.com/profiles/alice.jpg",
    receiver_id: 2,
    receiver_name: "Bob",
    receiver_profile: "https://example.com/profiles/bob.jpg",
    call_type: "video",
    call_status: "COMPLETED",
    start_time: "2025-03-07T14:00:00Z",
    end_time: "2025-03-07T14:30:00Z",
  },
  // Incoming Missed Call (Voice)
  {
    call_id: "1002",
    caller_id: 3,
    caller_name: "Charlie",
    caller_profile: "https://example.com/profiles/charlie.jpg",
    receiver_id: 1,
    receiver_name: "David",
    receiver_profile: "https://example.com/profiles/david.jpg",
    call_type: "voice",
    call_status: "MISSED",
    start_time: "2025-03-07T13:45:00Z",
    end_time: null,
  },
  // Outgoing Rejected Call (Video)
  {
    call_id: "1003",
    caller_id: 1,
    caller_name: "Eve",
    caller_profile: "https://example.com/profiles/eve.jpg",
    receiver_id: 6,
    receiver_name: "Frank",
    receiver_profile: "https://example.com/profiles/frank.jpg",
    call_type: "video",
    call_status: "REJECTED",
    start_time: "2025-03-07T12:55:00Z",
    end_time: "2025-03-07T12:56:00Z",
  },
  // Ongoing Incoming Call (Voice)
  {
    call_id: "1004",
    caller_id: 1,
    caller_name: "Grace",
    caller_profile: "https://example.com/profiles/grace.jpg",
    receiver_id: 8,
    receiver_name: "Hank",
    receiver_profile: "https://example.com/profiles/hank.jpg",
    call_type: "voice",
    call_status: "ONGOING",
    start_time: "2025-03-07T11:30:00Z",
    end_time: null,
  },
  // Outgoing Completed Call (Voice)
  {
    call_id: "1005",
    caller_id: 1,
    caller_name: "Ivy",
    caller_profile: "https://example.com/profiles/ivy.jpg",
    receiver_id: 10,
    receiver_name: "Jack",
    receiver_profile: "https://example.com/profiles/jack.jpg",
    call_type: "voice",
    call_status: "COMPLETED",
    start_time: "2025-03-07T10:15:00Z",
    end_time: "2025-03-07T10:45:00Z",
  },
  // Incoming Completed Call (Video)
  {
    call_id: "1006",
    caller_id: 11,
    caller_name: "Kate",
    caller_profile: "https://example.com/profiles/kate.jpg",
    receiver_id: 1,
    receiver_name: "Leo",
    receiver_profile: "https://example.com/profiles/leo.jpg",
    call_type: "video",
    call_status: "COMPLETED",
    start_time: "2025-03-07T09:30:00Z",
    end_time: "2025-03-07T09:50:00Z",
  },
  // Outgoing Missed Call (Video)
  {
    call_id: "1007",
    caller_id: 1,
    caller_name: "Mike",
    caller_profile: "https://example.com/profiles/mike.jpg",
    receiver_id: 14,
    receiver_name: "Nina",
    receiver_profile: "https://example.com/profiles/nina.jpg",
    call_type: "video",
    call_status: "MISSED",
    start_time: "2025-03-07T08:20:00Z",
    end_time: null,
  },
  // Incoming Rejected Call (Voice)
  {
    call_id: "1008",
    caller_id: 15,
    caller_name: "Oscar",
    caller_profile: "https://example.com/profiles/oscar.jpg",
    receiver_id: 1,
    receiver_name: "Penny",
    receiver_profile: "https://example.com/profiles/penny.jpg",
    call_type: "voice",
    call_status: "REJECTED",
    start_time: "2025-03-07T07:10:00Z",
    end_time: "2025-03-07T07:11:00Z",
  },
  {
    call_id: "1009",
    caller_id: 1,
    caller_name: "Quinn",
    caller_profile: "https://example.com/profiles/quinn.jpg",
    receiver_id: 18,
    receiver_name: "Rachel",
    receiver_profile: "https://example.com/profiles/rachel.jpg",
    call_type: "video",
    call_status: "REJECTED",
    start_time: "2025-03-07T06:05:00Z",
    end_time: null,
  },
];

const CallHistory = () => {
  const id = useAppSelector((state) => state.user.id);
  return (
    <div className="p-3 h-[calc(100vh-10vh-73px)] overflow-auto">
      {callHistory.map((call) => (
        <div className="flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer">
          <Image
            className="rounded-full"
            width={45}
            height={45}
            src={profile}
            alt="profile"
          />
          <div className="flex justify-between items-center w-full">
            <div>
              <h5 className="font-medium">{call.receiver_name}</h5>
              <span className="text-slate-500">
                {moment(call.start_time).format("HH:MM A")}
              </span>
            </div>
            <div>
              {call.caller_id === id ? (
                call.call_status === "MISSED" ? (
                  <PhoneOutgoing className="text-red-500" /> // Outgoing Missed Call
                ) : call.call_status === "COMPLETED" ? (
                  <PhoneOutgoing className="text-green-500" /> // Outgoing Completed Call
                ) : call.call_status === "REJECTED" ? (
                  <PhoneOutgoing className="text-red-500" /> // Outgoing Rejected Call
                ) : call.call_status === "ONGOING" ? (
                  <Phone className="text-blue-500" /> // Outgoing Ongoing Call
                ) : null
              ) : call.receiver_id === id ? (
                call.call_status === "MISSED" ? (
                  <PhoneIncoming className="text-red-500" /> // Incoming Missed Call
                ) : call.call_status === "COMPLETED" ? (
                  <PhoneIncoming className="text-green-500" /> // Incoming Completed Call
                ) : call.call_status === "REJECTED" ? (
                  <PhoneIncoming className="text-red-500" /> // Incoming Rejected Call
                ) : call.call_status === "ONGOING" ? (
                  <PhoneIncoming className="text-blue-500" /> // Incoming Ongoing Call
                ) : null
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CallHistory;
