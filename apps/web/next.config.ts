import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  experimental: { optimizePackageImports: ["lucide-react"] },
  poweredByHeader: false,
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
};

export default nextConfig;
