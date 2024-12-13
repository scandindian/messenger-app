import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteUserConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  } as ViteUserConfig["test"],
});
