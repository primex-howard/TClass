import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for deployment
  output: 'export',
  distDir: 'dist',
  
  // Image optimization settings for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
