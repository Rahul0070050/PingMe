import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Illustration Container */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Cloud Illustration */}
          <div className="absolute top-16 left-12 w-32 h-16 bg-indigo-100 rounded-full"></div>
          <div className="absolute top-8 left-20 w-16 h-16 bg-indigo-100 rounded-full"></div>
          <div className="absolute top-12 right-12 w-20 h-20 bg-indigo-100 rounded-full"></div>
          {/* "404" floating in the clouds */}
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-indigo-300">
            404
          </span>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like you’re lost in the clouds. The page you’re looking for
          doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-indigo-200 text-indigo-800 font-medium rounded-lg hover:bg-indigo-300 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
