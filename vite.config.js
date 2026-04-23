import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/pwa_react_base/', // 🔥 ESSENCIAL

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'PWA React Base',
        short_name: 'PWA Base',
        description: 'Template React com PWA',
        theme_color: '#1a1d26',
        background_color: '#1a1d26',
        display: 'standalone',

        // 🔥 MUITO IMPORTANTE
        start_url: '/pwa_react_base/',

        icons: [
          {
            src: 'icon-192.png', // 🔥 SEM /
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