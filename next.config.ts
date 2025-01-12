import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const productionURL = "/sim-timer";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProduction ? productionURL : "",
  output: "export", // Static HTML Export를 위해 필요
  images: {
    unoptimized: true, // GitHub Pages 배포를 위해 필요
  },
};

export default nextConfig;
