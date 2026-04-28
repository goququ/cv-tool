import react from '@vitejs/plugin-react'
import path from 'node:path'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    css: true,
    environment: 'jsdom',
    passWithNoTests: true,
    setupFiles: ['./src/shared/config/test/setup-tests.ts'],
  },
})
