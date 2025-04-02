import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    return config; // Ensures Webpack is used instead of Turbopack
  },
};

export default nextConfig;
