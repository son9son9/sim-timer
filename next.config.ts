import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const productionURL = "/sim-timer";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProduction ? productionURL : "",
  assetPrefix: isProduction ? productionURL : "",
  output: "export", // Static HTML Export를 위해 필요
  images: {
    unoptimized: true, // GitHub Pages 배포를 위해 필요
    loader: "custom", // 커스텀 로더 설정
  },
  trailingSlash: true, // URL 끝에 슬래시 추가
};

export default nextConfig;
