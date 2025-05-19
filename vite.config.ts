
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Pages({ 
    dirs: "src/pages",
    extensions: ["tsx"]
  })],
  base: "./",
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
