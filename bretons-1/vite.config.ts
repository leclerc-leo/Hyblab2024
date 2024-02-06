import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './public',
    rollupOptions: {
      external: ["react", "react-router", "react-router-dom", "react-redux"],
      output: {
        globals: {
          react: "React",
          "react-router": "ReactRouter",
          "react-router-dom": "ReactRouterDOM",
          "react-redux": "ReactRedux",
        },
      },
    },
  },
  publicDir: './src/assets',
  base: '/bretons-1/', // Add a leading slash to fix the base path
});
