import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Allow local images from public folder
    unoptimized: false,
  },
};

export default nextConfig;
