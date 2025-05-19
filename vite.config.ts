
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import Pages from "vite-plugin-pages";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    Pages({ 
      dirs: "src/pages",
      extensions: ["tsx"]
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  base: "/",  // Changed from "./" to "/" for GitHub Pages
  server: {
    host: "::",
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
