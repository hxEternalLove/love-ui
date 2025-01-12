/*
 * Copyright (c) 2025 by 星语恋心-星语 
 * All Rights Reserved. 
 * @Author: 星语
 * @Date: 2025-01-12 21:47:29
 * @LastEditors: hxlove
 * @LastEditTime: 2025-01-12 22:38:23
 * @FilePath: \love-ui\apps\docs\vite.config.ts
 * @Description: 星语恋心出品，作者 @星语，版权归星语所有
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@types': '/src/types',
      '@contexts': '/src/contexts',
    },
  },
})
