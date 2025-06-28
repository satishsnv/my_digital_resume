import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3010,
    host: '0.0.0.0',
    open: false
  },
  preview: {
    port: 3010,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'build',
    sourcemap: true
  },
  // Handle JSX in .js files
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  // Handle environment variables
  define: {
    global: 'globalThis',
  }
})
