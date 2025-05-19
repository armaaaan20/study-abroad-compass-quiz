
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pages({ dirs: "src/pages", extensions: ["tsx"] })],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
