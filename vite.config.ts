import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy is the key part!
    // It tells Vite's development server to forward any requests
    // to paths starting with '/cart' to your Express server running on port 3000.
    proxy: {
      '/cart': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  }
})
