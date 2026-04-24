import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/pwa_react_base/',

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      // 🔥 TROCA AQUI
      strategies: 'generateSW',

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],

        navigateFallback: 'index.html',

        navigateFallbackDenylist: [/^\/api\//],

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'document',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
        ],
      },

      manifest: {
        name: 'PWA React Base',
        short_name: 'PWA Base',
        description: 'Template React com PWA avançada',
        theme_color: '#1a1d26',
        background_color: '#1a1d26',
        display: 'standalone',
        start_url: '/pwa_react_base/',

        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})