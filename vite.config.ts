import { resolve } from "path";

import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros"],
      },
    }),
    macrosPlugin(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
