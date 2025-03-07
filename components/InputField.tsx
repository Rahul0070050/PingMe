"use client";

import React from "react";

// Utility to merge class names (you might already have this in '@/lib/utils')
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  maxLength?: number;
  className?: string; // Added to allow custom styling
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  className,
}) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={cn(
        "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
        "transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm",
        className // Merge custom className here
      )}
      placeholder={placeholder}
    />
    {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
  </div>
);

export default InputField;
