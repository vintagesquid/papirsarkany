import path from "node:path";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: [
      "./src/tests/vitest-cleanup-after-each.ts",
      "./src/mocks/gsap.mock.ts",
    ],
    dir: "./src/tests",
    exclude: ["e2e"],
    env: loadEnv("", process.cwd(), ""),
    coverage: {
      include: ["src/{components,hooks,lib,store}"],
      reporter: "text",
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      "@sanity/lib": path.resolve(__dirname, "sanity/lib"),
    },
  },
});
