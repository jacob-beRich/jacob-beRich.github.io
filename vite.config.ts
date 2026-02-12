
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    plugins: [react()],
    // 智能路径配置：
    // 开发环境 (npm run dev) -> 使用 '/'，方便本地调试
    // 生产环境 (npm run build) -> 使用 '/Personal-Web3.0/'，适配 GitHub Pages 子目录
    base: isProduction ? '/Personal-Web3.0/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})
