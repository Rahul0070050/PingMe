"use client";
import React from "react";

interface LoadingScreenProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  variant?: "spinner" | "dots" | "ring";
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
  size = "md",
  color = "blue-500",
  variant = "spinner",
}) => {
  const sizeStyles = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-6",
  };

  const variants = {
    spinner: (
      <div
        className={`
          ${sizeStyles[size]}
          border-t-${color}
          border-solid
          rounded-full
          animate-spin
        `}
      />
    ),
    dots: (
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`
              ${
                size === "sm"
                  ? "w-2 h-2"
                  : size === "md"
                  ? "w-3 h-3"
                  : "w-4 h-4"
              }
              bg-${color}
              rounded-full
              animate-bounce
            `}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    ),
    ring: (
      <div
        className={`
          ${sizeStyles[size]}
          border-${color}
          border-t-transparent
          border-solid
          rounded-full
          animate-spin
        `}
      />
    ),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50 transition-opacity duration-300">
      {variants[variant]}
      {message && (
        <p className={`text-lg text-gray-600 animate-pulse font-medium`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingScreen;
