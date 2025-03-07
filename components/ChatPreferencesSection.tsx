import React from "react";
import { MessageSquare } from "lucide-react";
import { UserSettings } from "../utils/userSettingsLogic";

interface ChatPreferencesSectionProps {
  settings: UserSettings;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ChatPreferencesSection: React.FC<ChatPreferencesSectionProps> = ({
  settings,
  handleChange,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <MessageSquare className="w-5 h-5 text-indigo-600" />
      <h3 className="text-lg font-semibold text-gray-800">Chat Preferences</h3>
    </div>
    <div className="space-y-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="chatNotifications"
          checked={settings.chatNotifications}
          onChange={handleChange}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span className="text-sm text-gray-700">Enable chat notifications</span>
      </label>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="chatSound"
          checked={settings.chatSound}
          onChange={handleChange}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span className="text-sm text-gray-700">Enable chat sound</span>
      </label>
    </div>
  </div>
);

export default ChatPreferencesSection;
