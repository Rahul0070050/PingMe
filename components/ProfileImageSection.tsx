import React from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { UserSettings } from "../utils/userSettingsLogic";

interface ProfileImageSectionProps {
  settings: UserSettings;
  imagePreview: string | null;
  errors: { [key: string]: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  settings,
  imagePreview,
  errors,
  handleChange,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
    <div className="flex items-center gap-4">
      {imagePreview ? (
        <Image
          src={imagePreview}
          alt="Profile preview"
          width={100}
          height={100}
          className="rounded-full border border-gray-300 object-contain"
        />
      ) : (
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-3xl">
          {settings.username ? settings.username[0].toUpperCase() : "?"}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {settings.username || "User"}
        </h3>
        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-200 shadow-sm text-sm font-medium">
          <Camera className="w-4 h-4" />
          <span>Change Profile Picture</span>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
        {errors.profileImage && (
          <p className="text-xs text-red-600">{errors.profileImage}</p>
        )}
      </div>
    </div>
  </div>
);

export default ProfileImageSection;
