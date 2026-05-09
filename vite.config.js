import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/pwa_react_base/',

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        navigateFallback: '/pwa_react_base/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        navigateFallbackAllowlist: [/^\/pwa_react_base\/.*/],
      },

      manifest: {
        name: 'Django Blog PWA',
        short_name: 'Django Blog',
        description: 'Blog Django com PWA',
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