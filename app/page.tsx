"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";
import banner from "@/public/images/banner.svg";
import chatlockChat from "@/public/images/chatlock.svg";
import happyChat from "@/public/images/happy.svg";

interface User {
  name: string;
  email: string;
}

export default function Dashboard() {
  const {
    value: user,
    setValue: setUser,
    removeValue: removeUser,
  } = useLocalStorage<User | null>("user", null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setUser({ name: "Alex Smith", email: "alex@example.com" });
  };

  const handleLogout = () => {
    removeUser();
  };

  if (isLoading) {
    return (
      <LoadingScreen message="Launching PingMe..." size="lg" color="sky-500" />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <header className="bg-white py-6 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sky-600 tracking-tight">
            PingMe
          </h1>
          <nav className="flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-sky-500 transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href="#benefits"
              className="text-gray-600 hover:text-sky-500 transition-colors duration-200"
            >
              Benefits
            </Link>
            <Link
              href="#start"
              className="text-gray-600 hover:text-sky-500 transition-colors duration-200"
            >
              Get Started
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors duration-200 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200 font-semibold"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>
      <section className="py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Connect Like Never Before
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            PingMe offers chatting, video calls, voice calls, conferencing, and
            screen sharing—all in one elegant platform.
          </p>
          <Link
            href={user ? "/chat" : "/login"}
            className="inline-block px-8 py-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
          >
            {user ? "Enter Chat" : "Try It Free"}
          </Link>
          <div className="mt-12">
            <Image
              src={banner}
              alt="PingMe Preview"
              className="p-20 rounded-xl mx-auto max-w-4xl w-full transform hover:scale-102 transition-transform duration-300"
            />
          </div>
        </div>
      </section>
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            All-in-One Communication
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Chatting"
              description="Send messages instantly with a clean, intuitive interface."
              icon="💬"
            />
            <FeatureCard
              title="Video Calls"
              description="Crystal-clear one-on-one video calls."
              icon="🎥"
            />
            <FeatureCard
              title="Voice Calls"
              description="High-quality voice calls anytime, anywhere."
              icon="📞"
            />
            <FeatureCard
              title="Video Call Conferencing"
              description="Host video conferences with multiple participants."
              icon="👥"
            />
            <FeatureCard
              title="Voice Call Conferencing"
              description="Conduct group voice calls with ease."
              icon="👥"
            />
            <FeatureCard
              title="Screen Sharing"
              description="Share your screen seamlessly during calls or conferences."
              icon="🖥️"
            />
          </div>
        </div>
      </section>
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why PingMe Stands Out
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <BenefitCard
              title="Seamless Experience"
              description="Switch between chatting, calls, and conferences effortlessly."
              image={happyChat}
            />
            <BenefitCard
              title="Secure & Reliable"
              description="End-to-end encryption and 99.9% uptime for peace of mind."
              image={chatlockChat}
            />
          </div>
        </div>
      </section>
      {/* <section id="start" className="py-20 bg-sky-500 text-white text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold mb-6">
            Start Communicating Smarter
          </h3>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Experience the full power of chatting, video, voice conferencing,
            and screen sharing with PingMe.
          </p>
          <Link
            href={user ? "/chat" : "#signup"}
            className="inline-block px-8 py-4 bg-white text-sky-500 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
          >
            {user ? "Launch Chat" : "Get Started Now"}
          </Link>
        </div>
      </section> */}
      <footer className="bg-white py-10 border-t border-gray-200">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">PingMe</h4>
            <p className="text-gray-600 text-sm">
              Your all-in-one communication solution.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#features" className="hover:text-sky-500">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#benefits" className="hover:text-sky-500">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Support
            </h4>
            <p className="text-gray-600 text-sm">support@pingme.com</p>
            <p className="text-gray-600 text-sm">+1 (800) 555-7890</p>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500 text-sm">
          © 2025 PingMe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex items-start space-x-4">
    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);
interface BenefitCardProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  image,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <Image
      src={image}
      alt={title}
      className="object-contain w-full h-48 rounded-md mb-4"
    />
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);
