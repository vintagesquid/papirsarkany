import NextBundleAnalyzer from "@next/bundle-analyzer";
import packageJSON from "./package.json" with { type: "json" };

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    globalNotFound: true,
  },
  allowedDevOrigins: ["127.0.0.1"],
  typedRoutes: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
        condition: { not: { path: "**/public/**/*.svg" } },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "sec-fetch-dest",
            value: "document",
          },
        ],
        headers: [
          {
            key: "App-Version",
            value: packageJSON.version,
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
