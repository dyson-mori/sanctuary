import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'pexels.com',
        port: ''
      }
    ],
  },
};

export default nextConfig;
