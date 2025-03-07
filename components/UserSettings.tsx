"use client";

import React, { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  X,
  Bell,
  MessageSquare,
  Phone,
  Video,
  Blocks,
  UserRoundX,
  Backpack,
  CircleArrowLeft,
} from "lucide-react";
import SubmitButton from "../components/SubmitButton";
import { toggleUserSettings } from "@/store/userSlice";

interface ContactSettings {
  allowNotifications: boolean;
  blockUser: boolean;
  allowMessages: boolean;
  allowCalls: boolean;
  allowVideo: boolean;
}

const SettingsPage: React.FC<{ contactId: number }> = ({ contactId }) => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.user); // Current user's data (optional)

  // Simulated initial settings for the selected contact (replace with actual data fetch)
  const [settings, setSettings] = useState<ContactSettings>({
    allowNotifications: true,
    blockUser: false,
    allowMessages: true,
    allowCalls: true,
    allowVideo: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(`Saving settings for contact ${contactId}:`, settings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
    setIsSubmitting(false);
  };

  const handleClose = () => {
    dispatch(toggleUserSettings());
  };

  return (
    <div className="col-span-3 h-[calc(100vh-2rem)] bg-white border-r border-gray-200 shadow-md flex flex-col">
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shadow-sm">
        <button
          onClick={handleClose}
          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Close settings"
        >
          <CircleArrowLeft className="w-7 h-7" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          Contact Settings
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-1 p-6 space-y-6 overflow-y-auto"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Notifications</h3>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allowNotifications"
              checked={settings.allowNotifications}
              onChange={handleChange}
              disabled={settings.blockUser} // Disable if blocked
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50"
            />
            <span className="text-sm text-gray-700">
              Allow notifications from this contact
            </span>
          </label>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Messages</h3>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allowMessages"
              checked={settings.allowMessages}
              onChange={handleChange}
              disabled={settings.blockUser}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50"
            />
            <span className="text-sm text-gray-700">
              Allow messages from this contact
            </span>
          </label>
        </div>

        {/* Calls */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Voice Calls</h3>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allowCalls"
              checked={settings.allowCalls}
              onChange={handleChange}
              disabled={settings.blockUser}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50"
            />
            <span className="text-sm text-gray-700">
              Allow voice calls from this contact
            </span>
          </label>
        </div>

        {/* Video Calls */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Video Calls</h3>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="allowVideo"
              checked={settings.allowVideo}
              onChange={handleChange}
              disabled={settings.blockUser}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50"
            />
            <span className="text-sm text-gray-700">
              Allow video calls from this contact
            </span>
          </label>
        </div>

        {/* Block User */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <UserRoundX className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Block</h3>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="blockUser"
              checked={settings.blockUser}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Block this contact</span>
          </label>
          {settings.blockUser && (
            <p className="text-xs text-gray-500 italic">
              Blocking this contact will disable all communication options.
            </p>
          )}
        </div>

        {/* Save Button */}
        <SubmitButton
          isSubmitting={isSubmitting}
          label="Save Settings"
          loadingLabel="Saving..."
        />
      </form>
    </div>
  );
};

export default SettingsPage;
