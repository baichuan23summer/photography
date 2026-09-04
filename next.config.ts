import type { NextConfig } from "next";
import { siteBasePath } from "./lib/paths";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: siteBasePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
