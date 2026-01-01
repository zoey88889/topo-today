// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': process.env // 可选，仅用于兼容旧项目
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,      // ✅ 去掉 hash
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});
