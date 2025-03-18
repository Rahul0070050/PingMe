import React from "react";
import SubmitButton from "./SubmitButton";

interface SaveSettingsSectionProps {
  isSubmitting: boolean;
  errors: { [key: string]: string };
  handleSubmit: (e: React.FormEvent) => void;
}

const SaveSettingsSection: React.FC<SaveSettingsSectionProps> = ({
  isSubmitting,
  errors,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    {errors.submit && (
      <p className="text-sm text-red-600 mb-3">{errors.submit}</p>
    )}
    <SubmitButton
      isSubmitting={isSubmitting}
      label="Save Settings"
      loadingLabel="Saving..."
      disabled={Object.keys(errors).length > 0 || isSubmitting}
      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-200 font-medium shadow-sm"
    />
  </div>
);

export default SaveSettingsSection;
