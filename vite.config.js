// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': process.env // 兼容旧语法
  }
});