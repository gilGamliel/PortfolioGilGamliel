import type { NextConfig } from "next";

const repoName = "PortfolioGilGamliel"; // 👈 change this

const nextConfig: NextConfig = {
  output: "export",

  reactCompiler: true,

  images: {
    unoptimized: true,
  },

  basePath: process.env.NODE_ENV === "production" ? `/${repoName}` : "",
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repoName}/` : "",
};

export default nextConfig;
