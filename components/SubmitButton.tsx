"use client";

import React from "react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
  disabled?: boolean; // Added explicit disabled prop
  className?: string; // Optional: Added for styling flexibility
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  label,
  loadingLabel,
  disabled = false, // Default to false if not provided
  className,
}) => (
  <button
    type="submit"
    disabled={isSubmitting || disabled} // Combine isSubmitting and disabled
    className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold
        shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
        focus:ring-offset-2 transition-all duration-200 flex items-center justify-center
        ${isSubmitting || disabled ? "opacity-70 cursor-not-allowed" : ""} ${
      className || ""
    }`}
  >
    {isSubmitting ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {loadingLabel}
      </>
    ) : (
      label
    )}
  </button>
);

export default SubmitButton;
