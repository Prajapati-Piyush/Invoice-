import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  allowedDevOrigins: [
    "192.168.1.27",
    "192.168.1.*",
    "*.local",
  ],
};

export default nextConfig;
