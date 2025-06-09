import { API_BASE_URL } from "@/constants/api";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://fakestoreapi.com/**")],
  },
};

export default nextConfig;
