import React from "react";
import { User } from "lucide-react";
import InputField from "./InputField";
import { UserSettings } from "../utils/userSettingsLogic";

interface ProfileDetailsSectionProps {
  settings: UserSettings;
  errors: { [key: string]: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({
  settings,
  errors,
  handleChange,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <User className="w-5 h-5 text-indigo-600" />
      <h3 className="text-lg font-semibold text-gray-800">Profile Details</h3>
    </div>
    <div className="space-y-5">
      <InputField
        label="Username"
        id="username"
        name="username"
        type="text"
        value={settings.username}
        onChange={handleChange}
        placeholder="Enter your username"
        error={errors.username}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-md bg-white"
      />
      <InputField
        label="Email"
        id="email"
        name="email"
        type="email"
        value={settings.email}
        onChange={handleChange}
        placeholder="Enter your email"
        error={errors.email}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-md bg-white"
      />
      <InputField
        label="Mobile Number"
        id="phone"
        name="phone"
        type="tel"
        value={settings.phone}
        onChange={handleChange}
        placeholder="e.g., +1234567890"
        error={errors.phone}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-md bg-white"
      />
      <div className="space-y-1">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={settings.bio}
          onChange={handleChange}
          placeholder="Tell something about yourself"
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
            transition-all duration-200 text-gray-900 placeholder-gray-400 h-24 resize-y"
          maxLength={150}
        />
      </div>
    </div>
  </div>
);

export default ProfileDetailsSection;
