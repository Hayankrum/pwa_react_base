/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate
} from 'workbox-strategies'

clientsClaim()

// ===============================
// 🔥 PRECACHE (arquivos do build)
// ===============================
precacheAndRoute(self.__WB_MANIFEST)


// ===============================
// ⚡ FORÇA ATUALIZAÇÃO IMEDIATA
// ===============================
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await clients.claim()

      const cacheWhitelist = ['pages-cache', 'images-cache', 'api-cache']

      const keys = await caches.keys()
      await Promise.all(
        keys.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key)
          }
        })
      )

      console.log('[SW] Ativo e caches válidos mantidos')
    })()
  )
})


// ===============================
// 🌐 ROTAS DE PÁGINA (React Router)
// ===============================
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    try {
      const response = await fetch(event.request)
      return response
    } catch (error) {
      return caches.match('/pwa_react_base/') 
    }
  }
)


// ===============================
// 🖼️ IMAGENS
// ===============================
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache'
  })
)


// ===============================
// 🌐 API (BACKEND / AXIOS)
// ===============================
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache'
  })
)