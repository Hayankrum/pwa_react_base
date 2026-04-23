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

// 🔥 arquivos buildados (Vite injecta isso automaticamente)
precacheAndRoute(self.__WB_MANIFEST)


// ===============================
// 🌐 ROTAS DE PÁGINA (React Router)
// ===============================
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    networkTimeoutSeconds: 3
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
// 🌐 API (AXIOS / BACKEND)
// ===============================
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache'
  })
)


// ===============================
// ⚡ FORÇA ATUALIZAÇÃO IMEDIATA
// ===============================
self.skipWaiting()

self.addEventListener('activate', () => {
  console.log('[SW] Ativo e controlando a página')
})