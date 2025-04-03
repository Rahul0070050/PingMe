import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        {/* 404 Design */}
        <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute top-16 left-12 w-32 h-16 bg-indigo-300 opacity-30 rounded-full"></div>
          <div className="absolute top-8 left-20 w-16 h-16 bg-indigo-300 opacity-40 rounded-full"></div>
          <div className="absolute top-12 right-12 w-20 h-20 bg-indigo-300 opacity-30 rounded-full"></div>
          <span className="text-6xl font-bold text-indigo-400 select-none">
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

        {/* Back to Home Button */}
        <Link href="/" aria-label="Go back to homepage">
          <button className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
