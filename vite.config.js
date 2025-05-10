import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://laraveladmission.up.railway.app',
        changeOrigin: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  },
})
