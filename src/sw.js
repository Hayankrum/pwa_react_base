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

      // 🧹 limpa caches antigos (EVITA versão velha travada)
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))

      console.log('[SW] Ativo, cache limpo e controlando a página')
    })()
  )
})


// ===============================
// 🌐 ROTAS DE PÁGINA (React Router)
// ===============================
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache'
  })
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