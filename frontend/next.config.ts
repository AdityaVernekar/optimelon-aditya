import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,  // This disables TypeScript checks during the build
  },
};

export default nextConfig;
