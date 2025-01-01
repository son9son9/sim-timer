import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const productionURL = "/sim-timer";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProduction ? productionURL : "",
  assetPrefix: isProduction ? productionURL : "",
};

export default nextConfig;
