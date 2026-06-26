import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images and external placeholder URLs
    remotePatterns: [],
    unoptimized: false,
  },
};

export default nextConfig;
