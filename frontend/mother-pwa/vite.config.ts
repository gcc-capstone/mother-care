import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//, /^\/auth\//],

        // Dont cache auth endpoints
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/auth'),
            handler: 'NetworkOnly',
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
})
