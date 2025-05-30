import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // 🔧 CỰC QUAN TRỌNG với Netlify
  plugins: [react()],
});
// Cấu hình này đảm bảo ứng dụng React của bạn hoạt động tốt trên Netlify
