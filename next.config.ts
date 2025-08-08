import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: ["https://ndwtzygrpsofcdybhgky.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ndwtzygrpsofcdybhgky.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
