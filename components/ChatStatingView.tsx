import React from "react";

const ChatStartView = () => {
  const features = [
    {
      icon: "📹", // Video camera emoji (replace with video call icon)
      title: "Video Call",
      description: "Connect face-to-face with crystal-clear video quality.",
    },
    {
      icon: "🎙️", // Microphone emoji (replace with voice call icon)
      title: "Voice Call",
      description: "Enjoy seamless audio conversations anytime.",
    },
    {
      icon: "👥", // People emoji (replace with conferencing icon)
      title: "Video Conferencing",
      description: "Host meetings with multiple participants effortlessly.",
    },
    {
      icon: "💬", // Speech bubble emoji (replace with chat icon)
      title: "Text Chatting",
      description: "Send and receive messages instantly with ease.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-full w-full p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 text-center mb-8">
          Welcome to Your Communication Hub
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <span className="text-4xl mb-4 text-blue-500">
                {feature.icon}
              </span>
              <h2 className="text-xl font-medium text-gray-700 mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatStartView;
