import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.openfoodfacts.net","images.openfoodfacts.org",'lh3.googleusercontent.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
