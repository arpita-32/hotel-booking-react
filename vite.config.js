import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Required for React
    tailwindcss(), // Tailwind
  ],
  server: {
    port: 5173, // Run frontend on 3000 (or 5173 if preferred)
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Improve React HMR performance
  },
});