"use client"; // Mark as a Client Component

import { useAppDispatch } from "@/store/hook";
import { toggleStartANewChat } from "@/store/userSlice";
import { X } from "lucide-react";
import { useState, FormEvent } from "react";

// Define the type for the form data
interface ChatFormData {
  contact: string;
  contactType: "username" | "email" | "phone"; // New field for contact type
  message: string; // New field for initial message
  isGroupChat: boolean; // New field for group chat toggle
}

// Define the type for form errors
interface Errors {
  contact?: string;
  contactType?: string;
  message?: string;
  submit?: string;
}

// Define props type
interface StartNewChatProps {
  onChatStarted?: (data: ChatFormData) => void; // Updated callback to pass full form data
}

export default function StartNewChat({ onChatStarted }: StartNewChatProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ChatFormData>({
    contact: "",
    contactType: "username",
    message: "",
    isGroupChat: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Validate form input
  const validateForm = (): boolean => {
    const tempErrors: Errors = {};

    if (!formData.contact.trim()) {
      tempErrors.contact = "Contact is required";
    } else if (formData.contact.length < 3) {
      tempErrors.contact = "Contact must be at least 3 characters";
    } else if (
      formData.contactType === "email" &&
      !/\S+@\S+\.\S+/.test(formData.contact)
    ) {
      tempErrors.contact = "Please enter a valid email";
    } else if (
      formData.contactType === "phone" &&
      !/^\d{10}$/.test(formData.contact)
    ) {
      tempErrors.contact = "Phone must be a 10-digit number";
    }

    if (formData.message && formData.message.length > 200) {
      tempErrors.message = "Message cannot exceed 200 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        console.log("Starting chat with:", formData);
        onChatStarted?.(formData); // Pass full form data to parent
        setFormData({
          contact: "",
          contactType: "username",
          message: "",
          isGroupChat: false,
        });
      } catch (error) {
        console.log(error);
        setErrors({ submit: "Failed to start chat. Please try again." });
      }
    }
    setIsSubmitting(false);
  };

  // Reset form manually
  const resetForm = () => {
    dispatch(toggleStartANewChat());
  };

  return (
    <div className="bg-white space-y-6 col-span-3">
      <div className="flex justify-between items-center border-b p-6">
        <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
          Start New Chat
        </h2>
        <button
          onClick={resetForm}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium focus:outline-none cursor-pointer"
        >
          <X />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        {/* Contact Type Dropdown */}
        <div className="space-y-1">
          <label
            htmlFor="contactType"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Type
          </label>
          <select
            id="contactType"
            name="contactType"
            value={formData.contactType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 shadow-sm"
          >
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {/* Contact Input */}
        <div className="space-y-1">
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder={`Enter ${formData.contactType}`}
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm"
          />
          {errors.contact && (
            <span className="text-xs text-red-600 font-medium">
              {errors.contact}
            </span>
          )}
        </div>

        {/* Initial Message */}
        <div className="space-y-1">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Initial Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your first message..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm resize-none"
          />
          {errors.message && (
            <span className="text-xs text-red-600 font-medium">
              {errors.message}
            </span>
          )}
          <p className="text-xs text-gray-500">
            {formData.message.length}/200 characters
          </p>
        </div>

        {/* Group Chat Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isGroupChat"
            name="isGroupChat"
            checked={formData.isGroupChat}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isGroupChat"
            className="text-sm font-medium text-gray-700"
          >
            Start as Group Chat
          </label>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-2">
            <span className="text-sm text-red-600 font-medium">
              {errors.submit}
            </span>
          </div>
        )}

        {/* Footer with Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
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
                Starting...
              </>
            ) : (
              "Start Chat"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
