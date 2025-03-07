"use client";

import React from "react";
import { X } from "lucide-react";
import { useUserSettingsLogic } from "../utils/userSettingsLogic";
import ProfileImageSection from "./ProfileImageSection";
import ProfileDetailsSection from "./ProfileDetailsSection";
import SocialLinksSection from "./SocialLinksSection";
import ChatPreferencesSection from "./ChatPreferencesSection";
import SaveSettingsSection from "./SaveSettingsSection";
import { useAppDispatch } from "@/store/hook";
import { toggleSettings } from "@/store/userSlice";

const UserSettingsPage: React.FC = () => {
  const {
    settings,
    imagePreview,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit,
    handleClose,
  } = useUserSettingsLogic();

  const dispatch = useAppDispatch();
  function closeWindow() {
    handleClose();
    dispatch(toggleSettings());
  }
  return (
    <div className="col-span-6 h-[calc(100vh-2rem)] bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Account Settings
        </h2>
        <button
          onClick={closeWindow}
          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Close settings"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto space-y-6">
        <ProfileImageSection
          settings={settings}
          imagePreview={imagePreview}
          errors={errors}
          handleChange={handleChange}
        />
        <ProfileDetailsSection
          settings={settings}
          errors={errors}
          handleChange={handleChange}
        />
        <SocialLinksSection
          settings={settings}
          errors={errors}
          handleChange={handleChange}
        />
        <ChatPreferencesSection
          settings={settings}
          handleChange={handleChange}
        />
        <SaveSettingsSection
          isSubmitting={isSubmitting}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default UserSettingsPage;
