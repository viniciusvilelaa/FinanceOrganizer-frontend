import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Adicione a importação de volta

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // 2. Adicione o plugin de volta aqui
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
