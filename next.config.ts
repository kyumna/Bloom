import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: produces out/ folder, no server needed.
  // Safe for this app: fully client-side, no API routes, no SSR.
  output: 'export',
};

export default nextConfig;
