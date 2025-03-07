"use client";
import { useState } from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, error }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const handleDateChange = (type: "day" | "month" | "year", val: string) => {
    if (type === "day") setDay(val);
    if (type === "month") setMonth(val);
    if (type === "year") setYear(val);

    const newDay = type === "day" ? val : day;
    const newMonth = type === "month" ? val : month;
    const newYear = type === "year" ? val : year;

    if (newDay && newMonth && newYear) {
      const monthIndex = months.indexOf(newMonth) + 1;
      const formattedDate = `${newYear}-${monthIndex
        .toString()
        .padStart(2, "0")}-${newDay.padStart(2, "0")}`;
      onChange(formattedDate);
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Date of Birth
      </label>
      <div className="grid grid-cols-3 gap-2">
        <div className="relative">
          <select
            value={day}
            onChange={(e) => handleDateChange("day", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm 
                appearance-none pr-12"
          >
            <option value="" disabled>
              Day
            </option>
            {days.map((d) => (
              <option key={d} value={d.toString()}>
                {d}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>
        <div className="relative">
          <select
            value={month}
            onChange={(e) => handleDateChange("month", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm 
                appearance-none pr-12"
          >
            <option value="" disabled>
              Month
            </option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>
        <div className="relative">
          <select
            value={year}
            onChange={(e) => handleDateChange("year", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm 
                appearance-none pr-12"
          >
            <option value="" disabled>
              Year
            </option>
            {years.map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      {error && (
        <span className="text-xs text-red-600 font-medium">{error}</span>
      )}
    </div>
  );
};

export default DatePicker;
