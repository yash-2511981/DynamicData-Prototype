import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "6vqprsktfd3qqvtb.public.blob.vercel-storage.com",
        port: "",
        pathname: "/cms_project/**",
      },
    ],
  },
};

export default nextConfig;
