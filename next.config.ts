import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.openfoodfacts.net","images.openfoodfacts.org"],
  },
  reactStrictMode: true,
};

export default nextConfig;
