import React from "react";
import { Globe } from "lucide-react";
import InputField from "./InputField";
import { UserSettings } from "../utils/userSettingsLogic";

interface SocialLinksSectionProps {
  settings: UserSettings;
  errors: { [key: string]: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  settings,
  errors,
  handleChange,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <Globe className="w-5 h-5 text-indigo-600" />
      <h3 className="text-lg font-semibold text-gray-800">Social Links</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField
        label="Website"
        id="website"
        name="website"
        type="url"
        value={settings.website}
        onChange={handleChange}
        placeholder="e.g., https://yourwebsite.com"
        error={errors.website}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-md bg-white"
      />
      <InputField
        label="YouTube"
        id="youtubeLink"
        name="youtubeLink"
        type="url"
        value={settings.youtubeLink}
        onChange={handleChange}
        placeholder="e.g., https://youtube.com/yourchannel"
        error={errors.youtubeLink}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-md bg-white"
      />
      <InputField
        label="Twitter"
        id="twitterLink"
        name="twitterLink"
        type="url"
        value={settings.twitterLink}
        onChange={handleChange}
        placeholder="e.g., https://twitter.com/yourhandle"
        error={errors.twitterLink}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-md bg-white"
      />
      <InputField
        label="Facebook"
        id="facebookLink"
        name="facebookLink"
        type="url"
        value={settings.facebookLink}
        onChange={handleChange}
        placeholder="e.g., https://facebook.com/yourpage"
        error={errors.facebookLink}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-md bg-white"
      />
      <InputField
        label="LinkedIn"
        id="linkedinLink"
        name="linkedinLink"
        type="url"
        value={settings.linkedinLink}
        onChange={handleChange}
        placeholder="e.g., https://linkedin.com/in/yourprofile"
        error={errors.linkedinLink}
        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-md bg-white"
      />
    </div>
  </div>
);

export default SocialLinksSection;
