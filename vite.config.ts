import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'radix-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'wouter',
      '@tanstack/react-query',
      'framer-motion'
    ],
    exclude: []
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "kj-github-clone-1.preview.emergentagent.com",
      ".emergentagent.com",
      ".preview.emergentagent.com"
    ],
    hmr: {
      clientPort: 3000
    }
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: [
      "localhost", 
      "127.0.0.1",
      "kj-github-clone-1.preview.emergentagent.com",
      ".emergentagent.com",
      ".preview.emergentagent.com"
    ]
  },
});