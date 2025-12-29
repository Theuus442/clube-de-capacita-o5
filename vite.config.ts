import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/mercado-pago": {
        target: "https://zajyeykcepcrlngmdpvf.supabase.co/functions/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mercado-pago/, "/create-checkout"),
        onProxyReq: (proxyReq, req) => {
          // Copy Authorization header from client to Supabase function
          const authHeader = req.headers.authorization;
          if (authHeader) {
            proxyReq.setHeader('Authorization', authHeader);
          }
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
